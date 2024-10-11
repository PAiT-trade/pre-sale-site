/**
 * Helper function to use the /api/create-referral endpoint.
 * Provide the user's wallet, and get back the referral code to use
 */
export async function requestReferralCode(wallet: string): Promise<string> {
  const result = await fetch("/api/create-referral", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {},
    }),
  });
  if (result.status != 200) {
    throw new Error("Failed to get referral code");
  }
  return (await result.json()).referral;
}
