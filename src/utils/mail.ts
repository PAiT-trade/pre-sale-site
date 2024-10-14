import { google } from "googleapis";
// CREDENTIALS

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = "https://presale.pait.fi";
const AUTHORIZATION_CODE = "";

console.log("CLIENT_ID: ", process.env);

// create and OAuth2 client instance
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export const getRefreshToken = async (): Promise<string | null | undefined> => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.send"],
  });

  console.log("Authorize this app by visiting this url:", authUrl);

  // const { tokens } = await oAuth2Client.getToken(AUTHORIZATION_CODE);
  // oAuth2Client.setCredentials(tokens);
  // console.log("Tokens:", tokens);
  // console.log("Refresh Token:", tokens.refresh_token);

  return "tokens.refresh_token";
};

// send an email
export const sendMail = async (options: {
  to: string;
  subject: string;
  text: string;
  base64EncodedFile: string;
}) => {
  const refresh_token = await getRefreshToken();
  // Set the  refresh token
  oAuth2Client.setCredentials({ refresh_token: refresh_token });
  try {
    // const accessToken = oAuth2Client.getAccessToken();
    const fileName = `PAIT - PRESALE ROUND SAFT AGREEMENT DOCUMENT`;

    const email = [
      `From: YOUR_EMAIL@gmail.com`,
      `To: ${options.to}`,
      `Subject: ${options.subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/mixed; boundary="boundary"`,
      ``,
      `--boundary`,
      `Content-Type: text/plain; charset="UTF-8"`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      options.text,
      ``,
      `--boundary`,
      `Content-Type: application/pdf; name="${fileName}"`,
      `Content-Transfer-Encoding: base64`,
      `Content-Disposition: attachment; filename="${fileName}"`,
      ``,
      options.base64EncodedFile,
      ``,
      `--boundary--`,
    ].join("\n");

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const encodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });

    console.log("Email sent...", result.data);

    return {
      status: "success",
      message: `Successfully sent an email to ${options.to}`,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to send an email",
    };
  }
};
