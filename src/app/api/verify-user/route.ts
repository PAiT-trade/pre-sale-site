import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Data: ", data);

  let walletData = "";
  let firstName = "";
  let lastName = "";
  let approved = "";

  if (data.verification && data.verification.person) {
    firstName = data.verification?.person?.firstName;
    lastName = data.verification?.person?.lastName;
    walletData = data.verification?.vendorData;
    approved = data.verification?.status;
  }

  try {
    if (approved === "approved" && walletData && firstName && lastName) {
      const exist = await prisma.user.findUnique({
        where: { wallet: walletData },
      });

      if (exist) {
        const user = prisma.user.update({
          where: { wallet: walletData },
          data: {
            name: `${firstName} ${lastName}`,
            email: "",
          },
        });
        return NextResponse.json({
          status: "success",
          user: user,
          message: "Updated user information",
        });
      }

      return NextResponse.json({
        status: "success",
        user: null,
        message: "Updated user successfully",
      });
    }
    return NextResponse.json({
      status: "failed",
      user: null,
      message: "Error updating user",
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

  let walletData = "";
  let firstName = "";
  let lastName = "";
  let approved = "";

  if (data.verification && data.verification.person) {
    firstName = data.verification?.person?.firstName;
    lastName = data.verification?.person?.lastName;
    walletData = data.verification?.vendorData;
    approved = data.verification?.status;
  }

  try {
    if (approved === "approved" && walletData && firstName && lastName) {
      const exist = await prisma.user.findUnique({
        where: { wallet: walletData },
      });

      if (exist) {
        const user = prisma.user.update({
          where: { wallet: walletData },
          data: {
            name: `${firstName} ${lastName}`,
            email: "",
          },
        });
        return NextResponse.json({
          status: "success",
          user: user,
          message: "Updated user information",
        });
      }

      return NextResponse.json({
        status: "success",
        user: null,
        message: "Updated user successfully",
      });
    }
    return NextResponse.json({
      status: "failed",
      user: null,
      message: "Error updating user",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      user: null,
      message: "Failed to update user",
    });
  }
}
