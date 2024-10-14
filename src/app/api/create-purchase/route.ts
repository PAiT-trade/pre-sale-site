import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const purchase = prisma.purchase.create({
      data: {
        user_id: data.user_id,
        pait_tokens: data.pait_tokens,
        usdc_amount: data.usdc_amount,
        used_referral: data.usedReferral,
      },
    });

    return NextResponse.json({
      status: "success",
      purchase: purchase,
      message: "Purchase created successfully",
    });
  } catch (error) {
    console.log("Create Purchase: ", error);
    return NextResponse.json({
      status: "error",
      purchase: null,
      message: "Failed to create purchase",
    });
  }
}
