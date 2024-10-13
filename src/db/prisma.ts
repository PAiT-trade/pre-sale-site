import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

export const prisma = new PrismaClient();

export const getUser = async (wallet: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { wallet: wallet },
    });

    return {
      status: "success",
      user: user,
      message: "User retrieved successfully",
    };
  } catch (error) {
    return { status: "error", message: "Failed to retrieve user" };
  }
};

export const createUser = async (opts: { wallet: string }) => {
  console.log("Creating user with wallet:", opts.wallet);
  try {
    const exist = await prisma.user.findFirst({
      where: { wallet: opts.wallet },
    });

    if (exist) {
      return { status: "success", user: exist, message: "User already exists" };
    }

    const referralCode = randomUUID();

    const user = prisma.user.create({
      data: {
        wallet: opts.wallet,
        referral: referralCode,
      },
    });

    return {
      status: "success",
      user: user,
      message: "User created successfully",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", user: null, message: "Failed to create user" };
  }
};

export const updateUser = async (opts: {
  name: string;
  email: string;
  wallet: string;
}) => {
  try {
    const exist = await prisma.user.findFirst({
      where: { wallet: opts.wallet },
    });

    if (!exist) {
      return { status: "error", message: "User does not exist" };
    }

    const user = prisma.user.update({
      where: { wallet: opts.wallet },
      data: {
        name: opts.name,
        email: opts.email,
      },
    });

    return {
      status: "success",
      user: user,
      message: "User updated successfully",
    };
  } catch (error) {
    return { status: "error", user: null, message: "Failed to update user" };
  }
};

// Purchases

export const createPurchase = async (opts: {
  user_id: number;
  pait_tokens: number;
  usdc_amount: number;
  usedReferral?: string;
}) => {
  try {
    const purchase = prisma.purchase.create({
      data: {
        user_id: opts.user_id,
        pait_tokens: opts.pait_tokens,
        usdc_amount: opts.usdc_amount,
        used_referral: opts.usedReferral,
      },
    });

    return {
      status: "success",
      purchase: purchase,
      message: "Purchase created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      purchase: null,
      message: "Failed to create purchase",
    };
  }
};
