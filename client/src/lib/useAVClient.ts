import { AVClient } from "@aion-dk/js-client";

export default async function useAVClient(slug: string) {
  const dbbUrl = `http://dbb:3003/${slug}`
  console.log(`Connecting to DBB: ${dbbUrl}`)
  const avClient = await new AVClient(dbbUrl);
  await avClient.initialize();
  await avClient.getLatestConfig();
  return avClient;
}
