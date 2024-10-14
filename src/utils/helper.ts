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

const getCurrentSlot = async () => {
  try {
    const currentSlot = await SOLANA_CONNECTION.getSlot();
    console.log("Current Slot (Block Number):", currentSlot);
    return currentSlot;
  } catch (error) {
    console.error("Error fetching current slot:", error);
  }
};
