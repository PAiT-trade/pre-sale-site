import { randomUUID } from "crypto";
import { db, ReferralTable } from "./database";
import { eq } from "drizzle-orm";

export const createOrUpdateUser = async (opts: {
  wallet: string;
  name?: string;
  email?: string;
}) => {
  try {
    const referralCode = randomUUID();

    const dbData = {
      wallet: opts.wallet,
      name: opts.wallet,
      email: opts.wallet,
      referral: referralCode,
    };

    // Create a new user account with the referral code or update the existing one
    const result = await db
      .insert(ReferralTable)
      .values(dbData)
      .onConflictDoUpdate({
        target: ReferralTable.wallet,
        set: {
          name: dbData.email,
          email: dbData.email,
        },
      });

    return result;
  } catch (error) {
    return { status: "error", message: "Failed to generate referral" };
  }
};

export const getUser = async (wallet: string) => {
  try {
    const result = await db
      .select()
      .from(ReferralTable)
      .where(eq(ReferralTable.wallet, wallet))
      .execute();

    if (result.length > 0) {
      console.log("User found:", result[0]);
      return result[0];
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
