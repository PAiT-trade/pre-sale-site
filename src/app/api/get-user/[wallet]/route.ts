import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    const user = await prisma.user.findUnique({
      where: { wallet: req.query.wallet as string },
    });

    return NextResponse.json({
      status: "success",
      user: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to retrieve user",
    });
  }
}
