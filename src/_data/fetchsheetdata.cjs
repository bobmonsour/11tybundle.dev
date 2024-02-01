const { google } = require("googleapis");
const sheets = google.sheets("v4");

module.exports = async function () {
  // Load client secrets from the downloaded service account key file.
  // Items from the file were placed into a .env file.
  const key = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_x509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_x509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
    spreadsheetId: process.env.SPREADSHEET_ID,
    spreadsheetRange: process.env.SPREADSHEET_RANGE,
  };

  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );

  await jwtClient.authorize();

  // Identify the specific spreadsheet
  // The range is the sheet name within the spreadsheet
  const spreadsheetId = key.spreadsheetId;
  const range = key.spreadsheetRange;

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
        // Exclude empty cells (some item types don't have all fields)
        if (row[j]) {
          var itemKey = headers[j];
          var itemValue = row[j].toString();
          // Convert string of comma-separated values to an array
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
};
