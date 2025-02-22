import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { LoaderFunctionArgs } from "react-router";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response("Bad Request: Missing key parameter", { status: 400 });
  }

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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to fetch signed url:", error);
    return new Response("Failed to fetch signed url", { status: 500 });
  }
}
