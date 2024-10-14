import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const purchases = await prisma.purchase.findMany({
      include: { user: true },
    });

    return NextResponse.json({
      status: "success",
      purchases: purchases,
      message: "Purchases retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to retrieve user",
      },
      { status: 500 }
    );
  }
}
