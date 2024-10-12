import { db, ReferralTable } from "@/lib/database";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const referralCode = randomUUID();

    const dbData = {
      wallet: data.wallet,
      name: data.wallet,
      email: data.wallet,
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

    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to generate referral" },
      { status: 500 }
    );
  }
}
