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
