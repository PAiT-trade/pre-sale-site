"use client";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import MoonPayOnRamp from "@/components/OnOffRamp/MoonPay";
import TransakOnOffRamp from "@/components/OnOffRamp/TransakOnOffRamp";
import { ModalSection } from "@/components/modal/Modal";
import { FlexBox } from "@/components/common/Common";
import { FlexItem } from "@/components/common/Common.styled";
import { BuyCard } from "@/components/buyCard/BuyCard";
import { Grid } from "styled-css-grid";
import { devices } from "@/utils/common";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, Signer } from "@solana/web3.js";
import toast from "react-hot-toast";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";

export default function Home() {
  const { connected, wallet, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [isMoonPayEnabled, setIsMoonPayEnabled] = useState<boolean>(false);
  const [isTransakEnabled, setIsTransakEnabled] = useState<boolean>(false);
  const [symbol, setSymbol] = useState("USDT");
  const [USDTAddress, setUSDTAddress] = useState(
    "Es9vMFrzaCERXgGyQr57yVCrr6oYqN2NEPNwv3PWoTy" // USDT Mint Adderss
  );

  const [recipientAddress, setRecipientAddress] = useState<string>(
    "ERgpvPPvSYnqTNay5uFRvcCiHYF48g9VkqXw8NroFepx" // my local address
  );

  const [inputValue, setInputValue] = useState<string>("");

  const [paymentModal, setPaymentModal] = useState<boolean>(false);

  const [allocations, setAllocations] = useState<{
    bought: number;
    total: number;
  }>({
    bought: 150000,
    total: 4000000,
  });
  const [amountInUsd, setAmountInUsd] = useState<number>(20);
  const [amountInPait, setAmountInPait] = useState<number>(1);
  const [endDateTime, setEndDateTime] = useState<string>("2024-10-24T00:00:00");
  const [priceOfPait, setPriceOfPait] = useState<number>(0.3);
  const [paymentMethod, setPaymentMethod] = useState<string>("usdt");

  useEffect(() => {
    const amounts = amountInUsd * priceOfPait;
    setAmountInPait(amounts);
  }, [amountInPait, amountInUsd, setAmountInPait, setPriceOfPait]);
  const content = [
    {
      title: "Huge Discounts",
      description:
        "Start with 40% off in the first round, then 30%, and so on. The earlier, the better!",
    },
    {
      title: "Limited Supply",
      description:
        "Only 8 million tokens available. Check the updated allocation every 24 hours.",
    },
    {
      title: "TGE on October 24, 2024",
      description: "Be ready when we go live!",
    },
    {
      title: "Unlock Schedule",
      description:
        "10% at TGE, I-month cliff, and the rest vests over 5 months.",
    },
    {
      title: "Daily Token Access",
      description: "Gain access to your tokens every 24 hours via Streamflow.",
    },
  ];

  const peformTrade = useCallback(async () => {
    if (!connected || !wallet || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const mintPublicKey = new PublicKey(USDTAddress);
      const recipientPublicKey = new PublicKey(recipientAddress);

      // Get the sender's associated token account for USDT
      const senderTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );

      console.log("senderTokenAccount", senderTokenAccount);
      console.log("Recipient", recipientPublicKey);

      // // Ensure the recipient has a token account; if not, create it
      // const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
      //   connection, // Solana connection
      //   publicKey?.toBase58(), // Payer (publicKey of the sender)
      //   mintPublicKey, // USDT Mint Address
      //   recipientPublicKey, // Recipient Address
      //   false, // allowOwnerOffCurve
      //   "processed", // Commitment level
      //   { preflightCommitment: "processed" } // Confirm options
      // );

      // // Create the transfer instruction
      // const transaction = new Transaction().add(
      //   createTransferInstruction(
      //     senderTokenAccount, // Sender's token account
      //     recipientTokenAccount.address, // Recipient's token account
      //     publicKey, // Owner of the sender's account
      //     parseFloat(amountInPait.toString()) * 1e18
      //   )
      // );

      // const signature = await sendTransaction(transaction, connection);
      // await connection.confirmTransaction(signature, "processed");
      // toast.error(`Transaction confirmed: ${signature}`);
    } catch (error) {
      console.error("Error sending USDT:", error);
      toast.error(`Error sending USDT`);
    }
  }, []);

  const sendUsdt = async () => {
    if (!connected || !wallet || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }
  };

  return (
    <>
      <FlexBox
        direction="row"
        justify="space-between"
        align="center"
        gap="0.6rem"
        margin="0px"
        wrap="nowrap"
      >
        <FlexItem>
          {/* <Button
            label="Pay with Card"
            icon={<CreditCardIcon />}
            onClick={() => {
              setIsMoonPayEnabled(false);
              setIsTransakEnabled(false);
              setPaymentModal(!paymentModal);
            }}
          /> */}

          <BuyCard
            allocations={allocations}
            isConnected={connected}
            amountInPait={amountInPait}
            amountInUsd={amountInUsd}
            setAmountInUsd={setAmountInUsd}
            endDateTime={endDateTime}
            buyPait={peformTrade}
            priceOfPait={priceOfPait}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </FlexItem>
        <FlexItem>
          <Content>
            <PageAdvertisement>
              <PageAdvertisementIcon src="/hamster.svg" />
            </PageAdvertisement>

            <PageTitle>PAiT Token Pre-Sale - Don’t Miss Out!</PageTitle>

            {content.map((item, index) => (
              <PageContent key={index}>
                <PageSubTitle>{item.title}</PageSubTitle>
                <PageDescription>{item.description}</PageDescription>
              </PageContent>
            ))}
          </Content>
        </FlexItem>
      </FlexBox>

      <ModalSection
        isOpen={paymentModal}
        setIsOpen={setPaymentModal}
        title="Pay With Card"
      >
        <MoonPayOnRamp
          inputValue={inputValue}
          setIsDrawerOpen={setIsMoonPayEnabled}
          setVisible={setIsMoonPayEnabled}
          visible={isMoonPayEnabled}
          tokenSymbol={symbol}
        />

        <TransakOnOffRamp
          apiKey="e6e15239-cae2-4d5d-bb8d-8f98346c576c"
          setIsDrawerOpen={setIsMoonPayEnabled}
          environment="staging"
          setVisible={setIsTransakEnabled}
          visible={isTransakEnabled}
          amount={Number(inputValue ? inputValue : "0")}
        />
      </ModalSection>
    </>
  );
}

const PageTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
`;

const PageAdvertisement = styled.div`
  width: 100%;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
`;
const PageAdvertisementIcon = styled.img`
  width: 100%;
`;

const PageDescription = styled.p`
  font-size: 15px;
  color: #e0e5f0;
  display: flex;
  text-align: left;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const PageSubTitle = styled.h5`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #afbad2;
  line-height: 1.7rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  @media ${devices.mobile} {
  }

  @media ${devices.tablet} {
  }

  @media ${devices.desktop} {
    width: 30rem;
    padding: 0 2rem;
  }
`;
