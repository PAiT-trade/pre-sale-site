import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    const user = await prisma.purchase.findFirst({
      where: { id: req.query.id as number },
      include: { user: true },
    });

    return NextResponse.json({
      status: "success",
      user: user,
      message: "Purchase retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to retrieve user",
    });
  }
}
