"use client";

import {
  PagesWrapper,
  PageTitle,
  PageWrap,
} from "@/components/common/Common.styled";
import { useWallet } from "@/context/WalletContext";
import { devices } from "@/utils/common";
import { useWallet as useConnectWallet } from "@solana/wallet-adapter-react";
import { CheckCircleIcon, CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
export default function KYC() {
  const {
    publicKey,
    privateKey,
    createNewWallet,
    connectWallet,
    isWalletConnected,
    seedPhrase,
  } = useWallet();
  const { connected, publicKey: phantomPublicKey } = useConnectWallet();

  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);
  const [isBackedUp, setIsBackedUp] = useState(false);

  const copyToClipboard = () => {
    if (seedPhrase === null) return;
    navigator.clipboard.writeText(seedPhrase);
    setIsCopied(true);
    toast.success("Seed phrase copied to clipboard");
  };

  useEffect(() => {
    createNewWallet();
  }, []);

  const handleBackup = () => {
    setIsBackedUp(true);
    if (seedPhrase === null) return;
    // save seed phrase to local storage

    // redirect to kyc processing
    router.push("/kyc");
  };

  useEffect(() => {
    if (connected && phantomPublicKey) {
      connectWallet();
    }
  }, [connected, phantomPublicKey, connectWallet]);

  return (
    <PagesWrapper>
      <PageWrap>
        <PageTitle>Your PAiT Wallet</PageTitle>
        <PageSubTitleDescription>
          {" "}
          The following are your Mnemonic Words, keep the well.{" "}
        </PageSubTitleDescription>
        <PageSubTitleDescription color="#ed7d7d">
          Copy them and safe them securely, if you loss them you have lost your
          account
        </PageSubTitleDescription>
        {publicKey && (
          <SeedContainer>
            <SeedList>
              {seedPhrase?.split(" ").map((word, index) => (
                <SeedItem key={index}>
                  {index + 1}. {word}
                </SeedItem>
              ))}
            </SeedList>
            <IconContainer onClick={copyToClipboard}>
              {isCopied ? (
                <CheckCircleIcon color="green" size={20} />
              ) : (
                <CopyIcon size={20} />
              )}
              <CopyText>{isCopied ? "Copied!" : "Copy to Clipboard"}</CopyText>
            </IconContainer>
            <BackupButton onClick={handleBackup}>
              Have you backed up your seed phrase ?
            </BackupButton>
            {isBackedUp && (
              <BackupMessage>Seed phrase backed up successfully!</BackupMessage>
            )}
          </SeedContainer>
        )}
      </PageWrap>
    </PagesWrapper>
  );
}

const SeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  margin: auto;
`;

const SeedList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  background: #1c2130;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  @media ${devices.mobile} {
    width: 100% !important;
  }

  @media ${devices.tablet} {
    width: 100% !important;
  }

  @media ${devices.desktop} {
    width: 100% !important;
  }
`;

const SeedItem = styled.li`
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
  padding-bottom: 5px;
  width: 50%;

  display: flex;
  justify-content: flex-start;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
  background-color: #22283b;
  padding: 10px 20px;
  border: 0.8rem;
`;

const CopyText = styled.span`
  font-size: 16px;
  margin-left: 8px;
`;

const BackupButton = styled.button`
  background-color: #22283b;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
`;

const BackupMessage = styled.p`
  font-size: 14px;
  color: green;
  margin-top: 10px;
`;
interface PageSubTitleDescriptionProps {
  color?: string;
}

const PageSubTitleDescription = styled.p<PageSubTitleDescriptionProps>`
  font-size: 16px;
  color: ${({ color }) => (color ? color : "#c0c4d1")};
  margin-top: 10px;
`;
