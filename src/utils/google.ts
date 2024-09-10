import { GOOGLE_JSON_API_KEY } from "@/GOOGLE_SHEET_API_KEY";
import { google } from "googleapis";
import { formatDate } from "./common";
const SHEET_ID = "1o215kgspt_UIz2sOw_I3bDye0i8Y4atCBuJAcNy42e0";

export const saveData = async (
  data: Array<string>
): Promise<{ status: string }> => {
  const auth = new google.auth.JWT({
    email: GOOGLE_JSON_API_KEY.client_email,
    key: GOOGLE_JSON_API_KEY.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheet = google.sheets("v4");

  const response = await sheet.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    auth: auth,
    range: formatDate(new Date()),
    valueInputOption: "RAW",
    requestBody: {
      values: [data],
    },
  });

  console.log("Response: ", response);
  return { status: "success" };
};
