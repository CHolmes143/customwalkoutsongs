import { NextResponse } from "next/server";
import { normalizeOrderPayload, orderFieldLabels, type OrderFormPayload } from "@/lib/orderForm";

const requiredFields: Array<keyof OrderFormPayload> = [
  "sport",
  "playerDivision",
  "playerFirstName",
  "playerLastName",
  "jerseyNumber",
  "musicStyle",
  "rushOrder",
  "parentGuardianName",
  "parentGuardianPhoneNumber",
];

export async function POST(request: Request) {
  const payload = normalizeOrderPayload((await request.json()) as Partial<OrderFormPayload>);
  const missingField = requiredFields.find((field) => !payload[field]);
  const host = request.headers.get("host") ?? "";
  const isLocalRequest = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  if (missingField) {
    return NextResponse.json({ message: `${orderFieldLabels[missingField]} is required.` }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    const message = isLocalRequest
      ? "Order form is in local testing mode. Google Sheets is not connected yet."
      : "Google Sheets is not connected yet. Please email customwalkoutsong@gmail.com to place your order.";

    return NextResponse.json({ message, sheetConnected: false }, { status: isLocalRequest ? 202 : 503 });
  }

  const url = new URL(webhookUrl);
  if (process.env.GOOGLE_SHEETS_WEBHOOK_SECRET) {
    url.searchParams.set("secret", process.env.GOOGLE_SHEETS_WEBHOOK_SECRET);
  }

  const response = await fetch(url, {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    return NextResponse.json({ message: "The order could not be sent. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ message: "Order received. Thank you!" });
}
