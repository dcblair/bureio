import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// fetches a signed url for an object in S3
export async function getSignedS3Url(key: string) {
  try {
    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      }),
      { expiresIn: 3600 },
    );

    return new Response(JSON.stringify({ url: signedUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch signed url", { status: 500 });
  }
}

// fetches signed url using a loader endpoint, since env vars are not available client-side
export async function getSignedS3UrlFromApi(key: string): Promise<string> {
  try {
    const response = await fetch(
      `/api/s3-signed-url?key=${encodeURIComponent(key)}`,
    );

    console.log(key, response, "response from signed url");

    if (!response.ok) {
      throw new Error("failed to fetch signed url");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch signed url:", error);
    throw error;
  }
}
