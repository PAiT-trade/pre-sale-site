import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  let walletData = "";
  let firstName = "";
  let lastName = "";
  let approved = "";

  if (data.verification && data.verification.person) {
    firstName = data.verification.person.firstName;
    lastName = data.verification.person.lastName;
    walletData = data.verification.vendorData;
    approved = data.verification.status;
  }

  try {
    if (approved === "approved" && walletData && firstName && lastName) {
      const user = await prisma.user.update({
        where: { wallet: walletData },
        data: {
          name: `${firstName} ${lastName}`,
          email: "",
          is_approved: true,
        },
      });
      return NextResponse.json({
        status: "success",
        user,
        message: "Updated user information",
      });
    }
    return NextResponse.json({
      status: "failed",
      user: null,
      message: "User not approved or missing information",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      user: null,
      message: "Failed to update user",
    });
  }
}
