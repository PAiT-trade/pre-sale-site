import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/aws";
import { sendEmail } from "@/lib/mail";
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const email = formData.get("email") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let url = "";

    try {
      const data = await uploadToS3(
        file,
        process.env.AWS_S3_BUCKET_NAME!,
        file.name
      );

      console.log("File uploaded successfully:", data);

      if (data) {
        url = data.Location!;
        const res = await sendEmail(
          email,
          "Your signed SAFT Agreement",
          "Hello, this is a test email!",
          `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            padding: 20px;
            color: #333;
        }
        .email-content {
            margin: 20px 0;
        }
        .signature {
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <div class="email-content">
        <p>Dear Sir/Madam,</p>

        <p>Follow the link to download your signed document. <a href = "${data.Location}"> Link </a></p>

        <p>If you have any questions or need further assistance, please feel free to reach out.</p>

        <p class="signature">Best regards,<br>
        PAit Team</p>
    </div>
</body>
</html>`
        );
      }
    } catch (error) {
      console.log("UPLOAD: ", error);
    }
    return NextResponse.json({ status: "success", url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
