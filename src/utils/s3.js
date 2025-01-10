import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const generatePresignedUrl = async (key) => {
  const bucketName = "odyssey-lms-digital-assets";

  try {
    const signedUrl = await s3.getSignedUrlPromise("getObject", {
      Bucket: bucketName,
      Key: key,
      Expires: 60,
    });
    return signedUrl;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw new Error("Failed to generate pre-signed URL");
  }
};

