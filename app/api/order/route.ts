import { NextResponse } from "next/server";
import { normalizeOrderPayload, orderFieldLabels, type OrderFormPayload } from "@/lib/orderForm";

const requiredFields: Array<keyof OrderFormPayload> = [
  "playerDivision",
  "playerFirstName",
  "playerLastName",
  "jerseyNumber",
  "musicStyle",
  "rushOrder",
  "parentGuardianName",
  "parentGuardianPhoneNumber",
  "parentGuardianEmail",
];

export async function POST(request: Request) {
  const payload = normalizeOrderPayload((await request.json()) as Partial<OrderFormPayload>);
  const missingField = requiredFields.find((field) => !payload[field]);

  if (missingField) {
    return NextResponse.json({ message: `${orderFieldLabels[missingField]} is required.` }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "The order form is ready, but Google Sheets is not connected yet." },
      { status: 503 },
    );
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
