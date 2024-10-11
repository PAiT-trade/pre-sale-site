import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import * as fs from "fs";

const CREDENTIALS_PATH = "path/to/credentials.json";
const TOKEN_PATH = "path/to/token.json";
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

// Load OAuth2 client credentials
function loadCredentials(): OAuth2Client {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Load token
  const token = fs.readFileSync(TOKEN_PATH, "utf-8");
  oAuth2Client.setCredentials(JSON.parse(token));

  return oAuth2Client;
}

// Send email using Gmail API
async function sendEmail() {
  const auth = loadCredentials();
  const gmail = google.gmail({ version: "v1", auth });

  const email = `
    From: "Sender Name" <your-email@example.com>
    To: recipient@example.com
    Subject: Test Email
    Content-Type: text/plain; charset="UTF-8"
    
    This is a test email sent from TypeScript using Gmail API.
  `;

  const base64EncodedEmail = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: base64EncodedEmail,
      },
    });
    console.log("Email sent:", res.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendEmail();
