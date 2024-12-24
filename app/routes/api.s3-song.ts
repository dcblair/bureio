import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { LoaderFunctionArgs } from "@remix-run/node";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function loader({ request }: LoaderFunctionArgs) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Prefix: "bureio/",
  });
  const { Contents } = await s3.send(command);

  return new Response(JSON.stringify(Contents), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
