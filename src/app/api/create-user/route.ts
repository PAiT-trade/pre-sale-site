import { prisma } from "@/db/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const dbData = {
      wallet: data.wallet,
    };

    const exist = await prisma.user.findFirst({
      where: { wallet: data.wallet },
    });

    if (exist) {
      return NextResponse.json({
        status: "success",
        user: exist,
        message: "User already exists",
      });
    }

    const referralCode = randomUUID();

    const user = await prisma.user.create({
      data: {
        wallet: data.wallet,
        referral: referralCode,
      },
    });

    return NextResponse.json({
      status: "success",
      user: user,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to generate referral",
    });
  }
}
