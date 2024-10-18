import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/aws";
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const purchase_id = Number(formData.get("purchase_id"));

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read the file as a Blob
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // S3 upload parameters
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!, // Your S3 bucket name
      Key: file.name, // Use the original file name
      Body: buffer, // Use the Buffer
      ContentType: file.type || "application/octet-stream", // Set ContentType
    };

    // Upload the file to S3
    // const data = await s3.upload(params).promise();

    const data = await uploadToS3(
      file,
      process.env.AWS_S3_BUCKET_NAME!,
      file.name
    );

    console.log("File uploaded successfully:", data.Location);

    const purchase = await prisma.purchase.update({
      where: { id: purchase_id },
      data: { signed_document_url: data.Location },
    });
    return NextResponse.json(
      { status: "success", url: data.Location },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
