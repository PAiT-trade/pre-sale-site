// app/api/purchase/[id]/route.ts
import { prisma } from "@/db/prisma"; // Adjust the import according to your project structure
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = params;
    if (!user_id) {
      return NextResponse.json(
        {
          status: "error",
          earnings: 0,
          message: "Invalid or missing user_id parameter",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(user_id) },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          earnings: 0,
          message: "user earnings not found",
        },
        { status: 404 }
      );
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const earnings = await prisma.purchase.aggregate({
      where: {
        user_id: Number(user_id),
        created_at: {
          gte: today,
        },
      },
      _sum: {
        pait_tokens: true,
      },
    });

    return NextResponse.json({
      status: "success",
      earnings,
      message: "Uaser earnings retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving earnings:", error);
    return NextResponse.json(
      {
        status: "error",
        earnings: 0,
        message: "Failed to retrieve earnings",
      },
      { status: 500 }
    );
  }
}
