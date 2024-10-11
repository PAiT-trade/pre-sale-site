import { apiSign, getBaseUrl } from "@/lib/alchemy-pay";
import { db, ReferralTable } from "@/lib/database";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    let requestUrl = `${getBaseUrl(true)}/open/api/v4/merchant/trade/create`;
    const timestamp = String(Date.now());
    const method = "POST";
    const body = JSON.stringify({
      side: "BUY",
      cryptoCurrency: "USDT",
      address: "TSx82tWNWe5Ns6t3w94Ye3Gt6E5KeHSoP8",
      network: "SOL",
      fiatCurrency: "USD",
      amount: "100",
      depositType: 2,
      payWayCode: "10001",
      alpha2: "US",
      redirectUrl: "",
      callbackUrl: `http://payment.jyoumoney.com/alchemyRamp/pay/callback?tradeNo=${randomUUID()}&amount=${
        data.amount
      }&userWallet=${data.userWallet}`,
    });
    const secretkey = "XXXXX";

    const sign = apiSign(timestamp, method, requestUrl, body, secretkey);

    return NextResponse.json({
      message: "Success",
      sign,
      timestamp,
      encodedSign: encodeURIComponent(sign),
    });
  } catch (error) {
    return {
      status: "error",
      message: "Failed to sign",
    };
  }
}
