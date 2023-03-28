import { AVClient } from "@aion-dk/js-client";
import { dbbUrl } from "./config"

export default async function useAVClient(slug: string) {
  const url = `${dbbUrl}/${slug}`;
  console.log(`Connecting to DBB: ${url}`);
  const avClient = await new AVClient(url);
  await avClient.initialize();
  await avClient.getLatestConfig();
  return avClient;
}
