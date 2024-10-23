"use client";
import { useEffect } from "react";
import { PagesWrapper, PageTitle } from "@/components/common/Common.styled";
import { VerifyKYC } from "@/components/kyc/VerifyKYC";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "../solana/solana-provider";
import styled from "styled-components";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import toast from "react-hot-toast";
import { ConnectWalletButtonExtends } from "@/components/common/Common";

export default function KYC() {
  const { connected, publicKey, isValidWallet, disconnect } =
    useAnalyzedWallet();

  useEffect(() => {
    if (connected && publicKey) {
      if (isValidWallet) {
        console.log("Connected to wallet", publicKey);
      } else {
        toast.error(
          "This wallet is not valid. It might be a compromised wallet, please use another one"
        );
        disconnect();
      }
    }
  }, [connected, publicKey, isValidWallet]);

  return (
    <PagesWrapper>
      {connected ? (
        <div style={{ padding: "1rem" }}>
          <PageTitle>Let’s get you verified</PageTitle>
          <KycContent>
            <VerifyKYC wallet={publicKey!} />
          </KycContent>
        </div>
      ) : (
        <ConnectWalletButtonExtends>
          <WalletButton>Connect Wallet</WalletButton>
        </ConnectWalletButtonExtends>
      )}
    </PagesWrapper>
  );
}

const KycContent = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
`;
