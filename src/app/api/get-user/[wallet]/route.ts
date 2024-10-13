import { getUser, prisma } from "@/db/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const user = await prisma.user.findUnique({
      where: { wallet: "ERgpvPPvSYnqTNay5uFRvcCiHYF48g9VkqXw8NroFepx" },
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
