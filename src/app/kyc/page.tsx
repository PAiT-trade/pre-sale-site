"use client";

import { PagesWrapper, PageTitle } from "@/components/common/Common.styled";
import { VerifyKYC } from "@/components/kyc/VerifyKYC";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "../solana/solana-provider";
import styled from "styled-components";

export default function KYC() {
  const { publicKey, connected } = useWallet();
  return (
    <PagesWrapper>
      {connected ? (
        <div style={{ padding: "1rem" }}>
          <PageTitle>Let’s get you verified</PageTitle>
          <KycContent>
            <VerifyKYC wallet={publicKey?.toBase58()!} />
          </KycContent>
        </div>
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

export const KycContent = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
`;
