import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Request Data: ", data);

  // Define referral percentages for first and second level
  const FIRST_LEVEL_PERCENTAGE = 0.05; // 5%
  const SECOND_LEVEL_PERCENTAGE = 0.025; // 2.5%

  try {
    // user making the purchase
    const user = await prisma.user.findUnique({
      where: {
        id: Number(data.user_id),
      },
    });

    if (!user) {
      return NextResponse.json({
        status: "error",
        purchase: null,
        message: "User not found",
      });
    }
    const referrer = await prisma.user.findFirst({
      where: {
        referral: data.usedReferral,
      },
    });

    // If there is no referrer, create the purchase
    if (!referrer) {
      const purchase = await prisma.purchase.create({
        data: {
          user_id: Number(data.user_id),
          pait_tokens: Number(data.pait_tokens),
          usdc_amount: Number(data.usdc_amount),
          used_referral: "",
        },
      });
      return NextResponse.json({
        status: "success",
        purchase: purchase,
        message: "Purchase created successfully",
      });
    }

    // Calculate referral earnings
    const firstLevelEarning = Number(data.pait_tokens) * FIRST_LEVEL_PERCENTAGE;
    const secondLevelEarning =
      Number(data.pait_tokens) * SECOND_LEVEL_PERCENTAGE;

    // Update referrer's earnings (Level 1)
    await prisma.user.update({
      where: { id: referrer.id },
      data: {
        referral_earnings: { increment: firstLevelEarning },
      },
    });

    // Find the second-level referrer
    const secondLevelReferrer = await prisma.user.findFirst({
      where: { referral: referrer.referral },
    });

    if (secondLevelReferrer) {
      // Update second-level referrer's earnings (Level 2)
      await prisma.user.update({
        where: { id: secondLevelReferrer.id },
        data: {
          referral_earnings: { increment: secondLevelEarning },
        },
      });

      // Find the third-level referrer
      const thirdLevelReferrer = await prisma.user.findFirst({
        where: { referral: secondLevelReferrer.referral },
      });

      if (thirdLevelReferrer) {
        // Update third-level referrer's earnings (Level 3, no earnings for User A)
        await prisma.user.update({
          where: { id: thirdLevelReferrer.id },
          data: {
            referral_earnings: { increment: 0 },
          },
        });
      }
    }

    // create the purchase
    const purchase = await prisma.purchase.create({
      data: {
        user_id: Number(data.user_id),
        pait_tokens: Number(data.pait_tokens),
        usdc_amount: Number(data.usdc_amount),
        used_referral: data.usedReferral,
      },
    });
    return NextResponse.json({
      status: "success",
      purchase: purchase,
      message: "Purchase created successfully",
    });
  } catch (error) {
    console.log("Create Purchase Error: ", error);
    return NextResponse.json({
      status: "error",
      purchase: null,
      message: "Failed to create purchase",
    });
  }
}
