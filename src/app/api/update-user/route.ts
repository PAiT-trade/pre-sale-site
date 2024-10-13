import { updateUser } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const dbData = {
      wallet: data.wallet,
      name: data.name,
      email: data.email,
    };
    const result = await updateUser(dbData);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to generate referral",
    });
  }
}
