<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">

	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
			<head>
				<title>The 11ty Bundle Blog RSS feed</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
				<style type="text/css">
					:root {
						/* Type scale from https://www.fluid-type-scale.com/, smallest to largest */
						--font-size-sm: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
						--font-size-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
						--font-size-md: clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
						--font-size-lg: clamp(1.56rem, 1vw + 1.31rem, 2.11rem);
						--font-size-xl: clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);
						--font-size-xxl: clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);
						--font-size-xxxl: clamp(3.05rem, 3.54vw + 2.17rem, 5rem);
						--body-background: #fff1e5;
						--brand-font: Optima, Candara, "Noto Sans", source-sans-pro, sans-serif;
						--brand-color: black;
						--link-hover-color: yellow;
						--dark-accent-color: #005bbb;
					}

					::selection {
						background-color: var(--link-hover-color);
						color: var(--brand-color);
					}
					html,
					body {
						margin: auto;
						padding: 20px;
						max-width: 90ch;
						background-color: var(--body-background);
						word-wrap: break-word;
						overflow-wrap: break-word;
						color: var(--brand-color);
						line-height: 1.6;
					}

					html,
					body,
					button,
					code,
					input {
						font-family: var(--brand-font);
					}

					h2, h3,	h4,	h5, h6 {
						color: var(--brand-color);
					}

					h2 {
						font-size: var(--font-size-md);
						margin-block-end: 0;
					}

					a {
						color: var(--brand-color);
						text-decoration: none;
						border-bottom: 1px solid var(--dark-accent-color);
					}
					a:hover {
						background-color: var(--link-hover-color);
					}
					p {
						font-size: var(--font-size-md);
					}
				</style>
			</head>
			<body>
					<p>
						<strong>This is an RSS feed</strong>. Subscribe by copying the URL from the address bar into your newsreader. Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more and get started. It’s free!
					</p>

				<hr />

				<div>
					<header>
						<h1>
							<!-- https://commons.wikimedia.org/wiki/File:Feed-icon.svg -->
							<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="vertical-align: text-bottom; width: 1.2em; height: 1.2em;" class="pr-1" id="RSSicon" viewBox="0 0 256 256">
								<defs>
									<linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
										<stop  offset="0.0" stop-color="#E3702D"/><stop  offset="0.1071" stop-color="#EA7D31"/>
										<stop  offset="0.3503" stop-color="#F69537"/><stop  offset="0.5" stop-color="#FB9E3A"/>
										<stop  offset="0.7016" stop-color="#EA7C31"/><stop  offset="0.8866" stop-color="#DE642B"/>
										<stop  offset="1.0" stop-color="#D95B29"/>
									</linearGradient>
								</defs>
								<rect width="256" height="256" rx="55" ry="55" x="0"  y="0"  fill="#CC5D15"/>
								<rect width="246" height="246" rx="50" ry="50" x="5"  y="5"  fill="#F49C52"/>
								<rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
								<circle cx="68" cy="189" r="24" fill="#FFF"/>
								<path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
								<path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
							</svg>

							RSS Feed Preview
						</h1>
						<p><xsl:value-of select="/atom:feed/atom:subtitle"/></p>
						<a class="head_link" target="_blank">
							<xsl:attribute name="href">
								<xsl:value-of select="/atom:feed/@xml:base"/>
							</xsl:attribute>
							&#x2190; Go back to 11tyBundle.dev
						</a>
					</header>

					<xsl:for-each select="/atom:feed/atom:entry">
						<div>
							<h2>
								<a href="{atom:link/@href}" target="_blank">
									<xsl:value-of select="atom:title"/>
								</a>
							</h2>
							<small>
								Published: <xsl:value-of select="substring(atom:updated, 1, 10)" />
							</small>
						</div>
					</xsl:for-each>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
