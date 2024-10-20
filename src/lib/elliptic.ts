import { AML } from "elliptic-sdk";
import { v4 as uuidv4 } from "uuid";

// `client` is an instance of axios
const { client } = new AML({
  key: process.env.ELLIPTIC_API_KEY!,
  secret: process.env.ELLIPTIC_API_SECRET!,
});

/**
 * Get the analysis of a wallet address
 * @returns
 * 0x9b322e68bee8f7d6c1c4d32083e9fe159a36aab1
 */
export const get_analysis = async (
  wallet: string = "ERgpvPPvSYnqTNay5uFRvcCiHYF48g9VkqXw8NroFepx",
  type: string = "address",
  asset: string = "holistic",
  blockchain: string = "holistic"
) => {
  const requestBody = {
    subject: {
      asset,
      blockchain,
      type: type,
      hash: wallet,
    },
    type: "wallet_exposure",
    customer_reference: uuidv4(),
  };
  try {
    const { data } = await client.post("/v2/wallet/synchronous", requestBody);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
