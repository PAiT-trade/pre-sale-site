import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Data: ", data);

  try {
    // const exist = await prisma.user.findUnique({
    //   where: { wallet: data.wallet },
    // });

    // if (exist) {
    //   const user = prisma.user.update({
    //     where: { wallet: data.wallet },
    //     data: {
    //       name: data.name,
    //       email: data.email,
    //     },
    //   });
    //   return NextResponse.json({
    //     status: "success",
    //     user: user,
    //     message: "Updated user information",
    //   });
    // }

    return NextResponse.json({
      status: "success",
      user: null,
      message: "Purchase created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      user: null,
      message: "Failed to update user",
    });
  }
}

export async function GET(req: Request) {
  const data = await req.json();

  console.log("Data: ", data);

  try {
    // const exist = await prisma.user.findUnique({
    //   where: { wallet: data.wallet },
    // });

    // if (exist) {
    //   const user = prisma.user.update({
    //     where: { wallet: data.wallet },
    //     data: {
    //       name: data.name,
    //       email: data.email,
    //     },
    //   });
    //   return NextResponse.json({
    //     status: "success",
    //     user: user,
    //     message: "Updated user information",
    //   });
    // }

    return NextResponse.json({
      status: "success",
      user: null,
      message: "Purchase created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      user: null,
      message: "Failed to update user",
    });
  }
}
