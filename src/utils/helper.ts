import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";

export const SOLANA_CONNECTION = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=3e1ca5e1-e923-4e0a-b66a-66e1dc340e57"
);

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
