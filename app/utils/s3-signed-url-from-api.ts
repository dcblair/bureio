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
