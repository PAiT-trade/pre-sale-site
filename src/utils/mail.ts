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
async function sendEmail(opts: {
  to: string;
  subject: string;
  message: string;
}) {
  const auth = loadCredentials();
  const gmail = google.gmail({ version: "v1", auth });

  const email = `
    From: "PAiT Sales" <presale@pait.fi>
    To: ${opts.to}
    Subject: ${opts.subject}
    Content-Type: text/plain; charset="UTF-8"
    MIME-Version: 1.0
    Content-Transfer-Encoding: 7bit
    ${opts.message}
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

import nodemailer from "nodemailer";

const OAuth2 = google.auth.OAuth2;

// const createTransporter = async () => {
//   try {
//     const oauth2Client = new OAuth2(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       "https://developers.google.com/oauthplayground"
//     );

//     oauth2Client.setCredentials({
//       refresh_token: process.env.REFRESH_TOKEN,
//     });

//     const accessToken = await new Promise((resolve, reject) => {
//       oauth2Client.getAccessToken((err, token) => {
//         if (err) {
//           console.log("*ERR: ", err);
//           reject();
//         }
//         resolve(token);
//       });
//     });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.USER_EMAIL,
//         accessToken,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//       },
//     });
//     return transporter;
//   } catch (err) {
//     return err;
//   }
// };

// const sendMail = async (opts: {
//   mail: string;
//   subject: string;
//   text: string;
// }) => {
//   try {
//     const mailOptions = {
//       from: process.env.USER_EMAIL,
//       to: opts.mail,
//       subject: opts.subject,
//       text: opts.text,
//     };

//     let emailTransporter: any = await createTransporter();
//     await emailTransporter.sendMail(mailOptions);
//   } catch (err) {
//     console.log("ERROR: ", err);
//   }
// };
