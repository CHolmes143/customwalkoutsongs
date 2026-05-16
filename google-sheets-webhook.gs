const SPREADSHEET_ID = "1TIGW6zDf5SFyVxrvfb71J6_gIMYs1tjXdt_lGk9TpgI";
const SHEET_NAME = "Sheet1";
const WEBHOOK_SECRET = "";

const HEADERS = [
  "Submitted At",
  "Sport",
  "Player Division",
  "Team Name",
  "Player First Name",
  "Player Last Name",
  "Jersey Number",
  "Music Style",
  "Rush Order",
  "Parent/Guardian Name",
  "Parent/Guardian Phone Number",
];

function doPost(event) {
  if (WEBHOOK_SECRET && event.parameter.secret !== WEBHOOK_SECRET) {
    return jsonResponse({ ok: false, message: "Unauthorized" }, 401);
  }

  const payload = JSON.parse(event.postData.contents || "{}");
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  ensureHeaders(sheet);

  sheet.appendRow([
    new Date(),
    payload.sport || "Baseball",
    payload.playerDivision || "",
    payload.teamName || "",
    payload.playerFirstName || "",
    payload.playerLastName || "",
    payload.jerseyNumber || "",
    payload.musicStyle || "",
    payload.rushOrder || "",
    payload.parentGuardianName || "",
    payload.parentGuardianPhoneNumber || "",
  ]);

  return jsonResponse({ ok: true });
}

function ensureHeaders(sheet) {
  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaders = HEADERS.some((header, index) => currentHeaders[index] !== header);

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
