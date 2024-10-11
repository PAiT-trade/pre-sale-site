// app/api/save-data/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { GOOGLE_JSON_API_KEY } from "./../../../GOOGLE_SHEET_API_KEY";
import { formatDate } from "./../../../utils/common";

const SHEET_NAME = "Sheet1";

const auth = new google.auth.JWT({
  email: GOOGLE_JSON_API_KEY.client_email,
  key: GOOGLE_JSON_API_KEY.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    console.log("Data: ", data);

    const sheet = google.sheets("v4");

    const response = await sheet.spreadsheets.values.append({
      spreadsheetId: GOOGLE_JSON_API_KEY.sheetId,
      auth: auth,
      range: SHEET_NAME,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            data.user,
            Math.round(Number(data.pait.replace(",", "")) * 100) / 100,
            data.usd,
            formatDate(new Date()),
            data.referral,
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

export async function GET() {
  try {
    const sheet = google.sheets("v4");

    // Fetch the data from the sheet (for example, from Sheet1)
    const response = await sheet.spreadsheets.values.get({
      spreadsheetId: GOOGLE_JSON_API_KEY.sheetId,
      auth: auth,
      range: `${SHEET_NAME}!A2:C`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        status: "success",
        data: [],
        message: "Success",
      });
    }

    return NextResponse.json({
      status: "success",
      data: rows,
      message: "Success",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      data: [],
      message: "Failed to fetch data",
    });
  }
}
