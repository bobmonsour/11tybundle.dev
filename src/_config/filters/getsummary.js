import Fetch from "@11ty/eleventy-fetch";
import * as cheerio from "cheerio";
import OpenAI from "openai";
import { performance } from "node:perf_hooks";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple chunker to stay under provider limits (chars ~= tokens/3-ish)
function chunkText(text, maxChars = 12000) {
  const parts = [];
  let buf = "";
  for (const p of text.split(/\n{2,}/)) {
    if ((buf + "\n\n" + p).length > maxChars) {
      if (buf) parts.push(buf);
      buf = p;
    } else {
      buf = buf ? `${buf}\n\n${p}` : p;
    }
  }
  if (buf) parts.push(buf);
  return parts;
}

function extractMainText(html) {
  const $ = cheerio.load(html);

  // Remove script, style, nav, header, footer, and aside elements
  $("script, style, nav, header, footer, aside").remove();

  // Extract text from headings and paragraphs
  const textParts = [];

  $("h1, h2, h3, h4, h5, h6, p").each((_, elem) => {
    const text = $(elem).text().trim();
    if (text) {
      textParts.push(text);
    }
  });

  // Get page title
  const title = $("title").text().trim();

  return {
    title,
    text: textParts.join("\n\n"),
  };
}

async function summarizeWithOpenAI(text, link) {
  const parts = chunkText(text, 12000);

  const summarize = async (content, instruction) => {
    const startTime = performance.now();
    const response = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: `${instruction}\n\n${content}` }],
    });
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log(`OpenAI API call for ${link}: ${duration}s`);

    return (response.choices[0]?.message?.content || "").trim();
  };

  if (parts.length === 1) {
    return await summarize(
      parts[0],
      "Summarize this page in 3–6 sentences for a general audience. Be faithful, concise, and neutral."
    );
  }

  // Map-reduce: summarize chunks, then summarize the summaries
  const chunkSummaries = [];
  for (const part of parts) {
    chunkSummaries.push(
      await summarize(
        part,
        "Summarize this chunk in 2–4 sentences. Be faithful, concise, and neutral."
      )
    );
  }

  return await summarize(
    chunkSummaries.join("\n\n"),
    "Combine these chunk summaries into one cohesive 2-4 sentence summary without repetition. Be faithful, concise, and neutral."
  );
}

// Main exported filter
export async function getSummary(link) {
  try {
    // Create a unique cache key based on the URL
    const { AssetCache } = await import("@11ty/eleventy-fetch");
    const cacheKey = `summary-${Buffer.from(link).toString("base64")}`;
    const summaryCache = new AssetCache(cacheKey, ".cache");

    // Try to fetch cached summary first
    if (summaryCache.isCacheValid("*")) {
      const cachedData = await summaryCache.getCachedValue();
      if (cachedData && cachedData.openAiSummary) {
        console.log(`Using cached summary for ${link}`);
        return `\n${cachedData.openAiSummary}`;
      }
    }

    console.log(`No cached summary found for ${link}, generating new one...`);

    // Fetch the HTML page
    const html = await Fetch(link, {
      directory: ".cache",
      duration: "1w", // Cache HTML for 1 week
      type: "text",
      fetchOptions: {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
        },
      },
    });

    const { title, text } = extractMainText(html);
    if (!text) return "";

    const input = `${title ? `${title}\n\n` : ""}${text}`;

    // Get summaries from both OpenAI
    const openAiSummary = await summarizeWithOpenAI(input, link);

    // Store the summary in cache
    await summaryCache.save(
      {
        url: link,
        openAiSummary: openAiSummary,
        generatedAt: new Date().toISOString(),
      },
      "json"
    );

    console.log(`Cached summary for ${link}`);

    return `\n${openAiSummary}`;
  } catch (e) {
    console.error(`getSummary error for ${link}: ${e.message}`);
    return "";
  }
}
