import { sendEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  // const file_name = Number(formData.get("file_name"));
  const email = formData.get("email") as string;

  if (!email) {
    return NextResponse.json(
      { error: "No file_name or email uploaded" },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  try {
    const data = await sendEmail(
      email,
      "Your signed SAFT Agreement",
      "Hello, this is a test email!",
      `
Dear Sir/Madam,

Attached is the signed SAFT Agreement for your reference. This document confirms the terms of our agreement for future token allocation.

If you have any questions or need further assistance, please feel free to reach out.

Best regards,
PAit Team`,
      file
    );
    return NextResponse.json({
      status: "success",
      mail: data,
      message: "mail sent successfully",
    });
  } catch (error) {
    console.error("Error sending mail:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to send mail",
      },
      { status: 500 }
    );
  }
}
