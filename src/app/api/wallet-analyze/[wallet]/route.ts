import { get_analysis } from "@/lib/elliptic";
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
    const data = await get_analysis(wallet);
    return NextResponse.json({
      status: "success",
      exposure: data,
      message: "Wallet  exposure successfully",
    });
  } catch (error) {
    console.error("Error exposure:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to exposure",
      },
      { status: 500 }
    );
  }
}
