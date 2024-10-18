// import AWS from "aws-sdk";

// // Load environment variables from .env.local
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Create an S3 instance
// const s3 = new AWS.S3();

// export default s3;

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

// Create an S3 client
export const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

//Upload file to S3
export const uploadToS3 = async (
  file: File,
  bucketName: string,
  fileName: string
) => {
  try {
    // Use AWS SDK's Upload for larger files
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName, // S3 bucket name
        Key: fileName, // File name
        Body: file, // The file object or stream
      },
    });

    // Listen to progress events
    upload.on("httpUploadProgress", (progress) => {
      console.log(`Uploaded: ${progress.loaded} of ${progress.total} bytes`);
    });

    const result = await upload.done();
    console.log("File uploaded successfully:", result);
    return result;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

export default uploadToS3;
