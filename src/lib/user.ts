import { randomUUID } from "crypto";
import { db, ReferralTable } from "./database";
import { eq } from "drizzle-orm";

export const createUser = async (opts: { wallet: string }) => {
  try {
    // First, check if the user already exists
    const existingUser = await db
      .select()
      .from(ReferralTable)
      .where(eq(ReferralTable.wallet, opts.wallet))
      .execute();

    // If the user already exists, return the existing record
    if (existingUser.length > 0) {
      return existingUser[0];
    }

    // If the user does not exist, create a new one
    const referralCode = randomUUID();

    const dbData = {
      wallet: opts.wallet,
      referral: referralCode,
    };

    // Insert the new user
    const result = await db.insert(ReferralTable).values(dbData).execute();

    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    return { status: "error", message: "Failed to create or retrieve user" };
  }
};

export const updateUser = async (opts: {
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
