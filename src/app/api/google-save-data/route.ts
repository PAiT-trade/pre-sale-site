// app/api/save-data/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { GOOGLE_JSON_API_KEY } from "@/GOOGLE_SHEET_API_KEY";
import { formatDate } from "@/utils/common";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    console.log("Data: ", data);

    const auth = new google.auth.JWT({
      email: GOOGLE_JSON_API_KEY.client_email,
      key: GOOGLE_JSON_API_KEY.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheet = google.sheets("v4");

    const response = await sheet.spreadsheets.values.append({
      spreadsheetId: GOOGLE_JSON_API_KEY.sheetId,
      auth: auth,
      range: "Sheet1",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            data.user,
            data.usd,
            Math.round(Number(data.pait) * 100) / 100,
            formatDate(new Date()),
          ],
        ],
      },
    });

    return NextResponse.json({ status: "success", response });
  } catch (error) {
    console.error("Error saving data to Google Sheets:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to save data" },
      { status: 500 }
    );
  }
}
