"use client";

import { PagesWrapper, PageTitle } from "@/components/common/Common.styled";
import { VerifyKYC } from "@/components/kyc/VerifyKYC";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "../solana/solana-provider";

export default function KYC() {
  const { publicKey, connected } = useWallet();
  return (
    <PagesWrapper>
      {connected ? (
        <>
          <PageTitle>Let’s get you verified</PageTitle>
          <VerifyKYC wallet={publicKey?.toBase58()!} />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <WalletButton>Connect Wallet</WalletButton>
        </div>
      )}
    </PagesWrapper>
  );
}
