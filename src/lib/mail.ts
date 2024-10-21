import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST!,
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false, // Disable certificate verification (for testing only)
  },
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASSWORD!,
  },
});

console.log({
  host: process.env.MAIL_HOST!,
  port: 587,
  secure: false,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASSWORD!,
  },
});
export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachement?: File
) => {
  // Convert File to Buffer if provided
  const attachmentBuffer = attachement ? await fileToBuffer(attachement) : null;

  try {
    const info = await transporter.sendMail({
      from: `info@paitpresale.fi`,
      to,
      subject,
      text,
      html,
      attachments: attachmentBuffer
        ? [
            {
              filename: attachement!.name,
              content: attachmentBuffer,
              contentType: attachement!.type,
            },
          ]
        : [],
    });

    console.log("Email sent:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
