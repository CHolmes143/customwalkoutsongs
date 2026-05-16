# Google Sheets Order Webhook Setup

The order form sends completed orders to a Google Apps Script web app. Vercel must have `GOOGLE_SHEETS_WEBHOOK_URL` set, or orders cannot populate the sheet.

## Setup

1. Open the Google Sheet:
   https://docs.google.com/spreadsheets/d/1TIGW6zDf5SFyVxrvfb71J6_gIMYs1tjXdt_lGk9TpgI/edit

2. Go to **Extensions > Apps Script**.

3. Paste the contents of `google-sheets-webhook.gs` into the Apps Script editor.

4. Click **Deploy > New deployment**.

5. Choose **Web app**.

6. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**

7. Click **Deploy**, authorize access, and copy the Web app URL.

8. Add that URL to Vercel as `GOOGLE_SHEETS_WEBHOOK_URL`.

9. Redeploy the site.

Expected sheet columns:

- Submitted At
- Sport
- Player Division
- Team Name
- Player First Name
- Player Last Name
- Jersey Number
- Music Style
- Rush Order
- Parent/Guardian Name
- Parent/Guardian Phone Number
