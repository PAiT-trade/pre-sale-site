import { db, ReferralTable } from "@/lib/database";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const referralCode = randomUUID();

    await db.insert(ReferralTable).values({
      wallet: data.wallet,
      referral: referralCode,
    });

    return NextResponse.json({
      status: "success",
      data: {
        referral: referralCode,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to generate referral" },
      { status: 500 }
    );
  }
}

/**
 * Helper function to use the /api/create-referral endpoint.
 * Provide the user's wallet, and get back the referral code to use
 */
export async function requestReferralCode(wallet: string): Promise<string> {
  const result = await fetch("/api/create-referral", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {},
    }),
  });
  if (result.status != 200) {
    throw new Error("Failed to get referral code");
  }
  return (await result.json()).referral;
}
