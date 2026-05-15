const SPREADSHEET_ID = "1TIGW6zDf5SFyVxrvfb71J6_gIMYs1tjXdt_lGk9TpgI";
const SHEET_NAME = "Sheet1";
const SHARED_SECRET = "";

const ORDER_COLUMNS = [
  "Player Division",
  "Team Name",
  "Player First Name",
  "Player Last Name",
  "Jersey Number",
  "Music Style",
  "Parent/Guardian Name",
  "Parent/Guardian Phone Number",
  "Parent/Guardian Email",
];

const FIELD_MAP = {
  "Player Division": "playerDivision",
  "Team Name": "teamName",
  "Player First Name": "playerFirstName",
  "Player Last Name": "playerLastName",
  "Jersey Number": "jerseyNumber",
  "Music Style": "musicStyle",
  "Parent/Guardian Name": "parentGuardianName",
  "Parent/Guardian Phone Number": "parentGuardianPhoneNumber",
  "Parent/Guardian Email": "parentGuardianEmail",
};

function doPost(e) {
  if (SHARED_SECRET && e.parameter.secret !== SHARED_SECRET) {
    return jsonResponse({ ok: false, message: "Unauthorized" }, 401);
  }

  const payload = JSON.parse(e.postData.contents || "{}");
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const row = ORDER_COLUMNS.map((column) => payload[FIELD_MAP[column]] || "");
  sheet.appendRow(row);

  return jsonResponse({ ok: true });
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
