import { eq } from "drizzle-orm";
import { PurchaseTable, db } from "./database";

export const createPurchase = async (opts: {
  user_wallet: string;
  user_name: string;
  pait_tokens: number;
  usdc_amount: number;
  referral: string;
}) => {
  try {
    const dbData = {
      user_wallet: opts.user_wallet,
      user_name: opts.user_name,
      pait_tokens: opts.pait_tokens,
      usdc_amount: opts.usdc_amount,
      referral: opts.referral,
    };

    // Insert the new purchase
    const result = await db.insert(PurchaseTable).values(dbData).execute();

    return {
      status: "success",
      result: result,
      message: "Purchase created successfully",
    };
  } catch (error) {
    console.error("Error creating purchase:", error);
    return {
      status: "error",
      result: null,
      message: "Failed to create purchase",
    };
  }
};

export const getWalletPurchase = async (wallet: string) => {
  try {
    const result = await db
      .select()
      .from(PurchaseTable)
      .where(eq(PurchaseTable.user_wallet, wallet))
      .execute();
    return {
      status: "success",
      result: result,
      message: "Purchases retrieved successfully",
    };
  } catch (error) {
    return {
      status: "error",
      result: [],
      message: "Failed to retrieve purchases",
    };
  }
};
export const getPurchases = async () => {
  try {
    const result = await db.select().from(PurchaseTable).execute();
    return {
      status: "success",
      result: result,
      message: "Purchases retrieved successfully",
    };
  } catch (error) {
    return {
      status: "error",
      result: [],
      message: "Failed to retrieve purchases",
    };
  }
};
