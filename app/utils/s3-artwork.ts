import {
  HeadObjectCommand,
  S3Client,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// fetches single artwork with metadata
export async function fetchArtwork(key: string) {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Prefix: `bureio/artwork/${key}`,
    });

    const { Contents } = await s3.send(listCommand);

    if (!Contents || Contents.length === 0) {
      throw new Error("No artwork found");
    }

    const metadataPromises = Contents.map(async (artwork) => {
      try {
        const headCommand = new HeadObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: artwork.Key!,
        });

        const metadataRes = await s3.send(headCommand);
        return {
          Key: artwork.Key,
          Metadata: metadataRes.Metadata,
          ContentType: metadataRes.ContentType,
        };
      } catch (error) {
        console.error("Failed to fetch artwork metadata", error);
        return null;
      }
    });
    return Promise.all(metadataPromises);
  } catch (error) {
    console.error("Failed to fetch artwork", error);
    return null;
  }
}
