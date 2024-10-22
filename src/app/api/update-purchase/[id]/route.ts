import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid or missing id parameter",
        },
        { status: 400 }
      );
    }

    const data = await req.json();

    const purchaseId = parseInt(id, 10);

    const purchase = await prisma.purchase.findFirst({
      where: { id: purchaseId },
    });

    if (!purchase) {
      return NextResponse.json(
        {
          status: "error",
          message: "Purchase not found",
        },
        { status: 404 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: purchase.user_id },
    });
    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found",
        },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: data.email,
        name: data.name,
        telegram: data.telegram ? data.telegram : "",
      },
    });
    return NextResponse.json({
      status: "success",
      purchase: purchase,
      message: "Purchase updated successfully",
    });
  } catch (error) {
    console.error("Error udpating purchase:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to update purchase",
      },
      { status: 500 }
    );
  }
}
