// app/api/upload/route.ts
import { NextResponse } from "next/server";
import s3 from "@/lib/aws"; // Adjust the import path based on your file structure

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // Parse the incoming FormData
    const file = formData.get("file") as File; // Get the file from FormData

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read the file as a Blob
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

    // S3 upload parameters
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!, // Your S3 bucket name
      Key: file.name, // Use the original file name
      Body: buffer, // Use the Buffer
      ContentType: file.type || "application/octet-stream", // Set ContentType
    };

    // Upload the file to S3
    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data.Location); // Log the uploaded file URL
    return NextResponse.json(
      { status: "success", url: data.Location },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
