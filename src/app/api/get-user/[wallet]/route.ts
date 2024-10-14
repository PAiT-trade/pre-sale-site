// app/api/purchase/[id]/route.ts
import { prisma } from "@/db/prisma"; // Adjust the import according to your project structure
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { wallet: string } }
) {
  try {
    const { wallet } = params;
    if (!wallet) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid or missing id parameter",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { wallet },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "user not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      user: user,
      message: "User retrieved successfully",
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
