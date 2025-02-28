import {
  HeadObjectCommand,
  S3Client,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { LoaderFunctionArgs } from "react-router";

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
    Prefix: "bureio/songs/",
  });
  const { Contents } = await s3.send(command);

  if (!Contents || Contents.length === 0) {
    return new Response("No songs found", { status: 404 });
  }

  const metadataPromises = Contents.map(async (song) => {
    const headCommand = new HeadObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: song.Key!,
    });

    const metadataRes = await s3.send(headCommand);
    return {
      Key: song.Key,
      Metadata: metadataRes.Metadata,
      ContentType: metadataRes.ContentType,
    };
  });

  const songsWithMetadata = await Promise.all(metadataPromises);

  return new Response(JSON.stringify(songsWithMetadata), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
