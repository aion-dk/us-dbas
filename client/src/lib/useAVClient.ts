import { AVClient } from "@aion-dk/js-client"

export default async function useAVClient(dbbUrl: string) {
  const avClient = await new AVClient(dbbUrl)
  await avClient.initialize()
  return avClient
}
