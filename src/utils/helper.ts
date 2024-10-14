import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";

export const SOLANA_CONNECTION = new Connection(
  "https://silent-necessary-meadow.solana-mainnet.quiknode.pro/6d359cf87da0762cbc7f5ce441fcd881fd74c108/",
  "confirmed"
);

// export const SOLANA_CONNECTION = new Connection(
//   "https://api.mainnet-beta.solana.com"
// );
export const getNumberDecimals = async (
  mintAddress: string
): Promise<number> => {
  const info = await SOLANA_CONNECTION.getParsedAccountInfo(
    new PublicKey(mintAddress)
  );
  const result = (info.value?.data as ParsedAccountData).parsed.info
    .decimals as number;
  return result;
};
