const { google } = require("googleapis");
const sheets = google.sheets("v4");

async function fetchSheetData() {
  // Load client secrets from the downloaded service account key file.
  // ***TODO: MOVE SENSITIVE DATA TO ENV VARIABLES***
  const key = require("./tybundle-98a8d3f9fa2b.json");

  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );

  await jwtClient.authorize();

  const spreadsheetId = "1aeWtopIlqCUq_aJXebsIfqfm2RLtMC-_sJ8U5rHVgqM";
  const range = "All Records";

  const request = {
    spreadsheetId: spreadsheetId,
    range: range,
    auth: jwtClient,
  };

  try {
    const response = await sheets.spreadsheets.values.get(request);
    const rows = response.data.values;
    const headers = rows[0];

    let jsonData = [];
    for (let i = 1; i < rows.length; i++) {
      let row = rows[i];
      let obj = {};
      for (let j = 0; j < headers.length; j++) {
        if (row[j]) {
          var itemKey = headers[j];
          var itemValue = row[j].toString();
          if (itemKey === "Categories") {
            itemValue = itemValue.split(",").map((item) => item.trim());
          }
          obj[itemKey] = itemValue;
        }
      }
      jsonData.push(obj);
    }
    return jsonData;
  } catch (err) {
    console.error("API request encountered an error:", err);
  }
}

module.exports = fetchSheetData;
