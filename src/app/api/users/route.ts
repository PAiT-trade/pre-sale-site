import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, _res: Response) {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return NextResponse.json(
        {
          status: "error",
          user: [],
          message: "Users not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      users: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json(
      {
        status: "error",
        users: [],
        message: "Failed to retrieve user",
      },
      { status: 500 }
    );
  }
}
