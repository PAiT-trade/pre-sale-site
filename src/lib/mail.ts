import nodemailer from "nodemailer";
import pako from "pako";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST!,
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
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
  // Compress the buffer
  const compressedBuffer = await compressBuffer(attachmentBuffer!);

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
              filename: `${attachement!.name}.gz`,
              content: compressedBuffer,
              contentType: `application/gzip`,
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

export const compressBuffer = (buffer: Buffer): Buffer => {
  // Set maximum compression level
  const compressed = pako.gzip(buffer, { level: 8 });
  return Buffer.from(compressed);
};
