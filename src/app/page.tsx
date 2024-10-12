"use client";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import TransakOnOffRamp from "@/components/OnOffRamp/TransakOnOffRamp";
import { ModalSection } from "@/components/modal/Modal";
import { FlexBox } from "@/components/common/Common";
import { FlexItem } from "@/components/common/Common.styled";
import { BuyCard } from "@/components/buyCard/BuyCard";
import { devices, formatNumber } from "@/utils/common";
import { useWallet, useConnection, Wallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import toast from "react-hot-toast";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  transfer,
} from "@solana/spl-token";
import * as Veriff from "@veriff/js-sdk";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import { CONFIGS } from "@/config";
import { VerifyKYC } from "@/components/kyc/VerifyKYC";
import { useRouter } from "next/navigation";
import WertOnRamp from "@/components/OnOffRamp/WertOnRamp";
import SignaturePad from "@/components/SaftDocument";
import { db } from "@/lib/database";
import { ReferralCodeShare } from "@/components/ReferralCodeShare";
import TermsAndConditions from "@/components/TermsAndConditions";
import { User } from "@/lib/database";
import { create } from "domain";
import { createUser } from "@/lib/user";
import { createPurchase } from "@/lib/purchase";

export default function Home() {
  const { connected, publicKey, sendTransaction } = useWallet();

  const wallet = useWallet();

  const { connection } = useConnection();
  const [isMoonPayEnabled, setIsMoonPayEnabled] = useState<boolean>(false);
  const [isTransakEnabled, setIsTransakEnabled] = useState<boolean>(false);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [data, setData] = useState<
    Array<{ wallet: string; amountPait: number; amountUSD: number }>
  >([]);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isTermsModal, setIsTermsModal] = useState<boolean>(false);
  // used to get the user code from the URL
  const [user, setUser] = useState<User | null>(null);

  const [balances, setBalances] = useState<{ sol: string; usdt: string }>({
    sol: "0",
    usdt: "0",
  });

  const [symbol, setSymbol] = useState("USDT");
  const [USDTAddress, setUSDTAddress] = useState(
    "Es9vMFrzaCERXgGyQr57yVCrr6oYqN2NEPNwv3PWoTy" // USDT Mint Adderss
  );

  const [recipientAddress, setRecipientAddress] = useState<string>(
    "ERgpvPPvSYnqTNay5uFRvcCiHYF48g9VkqXw8NroFepx" // my local address
  );

  const [inputValue, setInputValue] = useState<string>("");

  const [allocations, setAllocations] = useState<{
    bought: number;
    total: number;
  }>({
    bought: 0,
    total: 2000000,
  });
  const [amountInUsd, setAmountInUsd] = useState("200");
  const [mininumAmount, setMinimumAmount] = useState("200");
  const [isInValid, setInValid] = useState(false);
  const [maximumAmount, setMaximumAmount] = useState("20000");
  const [amountInPait, setAmountInPait] = useState("1");
  const [endDateTime, setEndDateTime] = useState<string>("2024-12-10T00:00:00");
  const [priceOfPait, setPriceOfPait] = useState("0.16");
  const [paymentMethod, setPaymentMethod] = useState<string>("usdc");
  const [referralCode, setReferralCode] = useState("");

  const router = useRouter();

  // Read referral code from URL
  useEffect(() => {
    console.log("URL: ", window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("referral");
    if (myParam) {
      setReferralCode(myParam);
    }
  }, []);

  /**
   * Get the current price of PAiT token
   */
  useEffect(() => {
    if (
      Number(amountInUsd) < Number(mininumAmount) ||
      Number(amountInUsd) > Number(maximumAmount)
    ) {
      setInValid(true);
    } else {
      setInValid(false);
    }

    const paits = Number(amountInUsd) / Number(priceOfPait);

    setAmountInPait(
      formatNumber(Math.round(Number(paits) * 100) / 100).toString()
    );
  }, [
    amountInUsd,
    amountInPait,
    priceOfPait,
    mininumAmount,
    maximumAmount,
    data,
    setData,
  ]);

  useEffect(() => {
    getBalances();

    if (publicKey) {
      // make sure to save the user's wallet to the database
      createUser({
        wallet: publicKey?.toBase58()!,
      })
        .then((result) => {
          console.log("APP Result: ", result);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
      // retrieve the saved user
    }
  }, [connected, wallet, publicKey]);

  const getBalances = async () => {
    // if (publicKey) {
    //   setRecipientAddress(publicKey.toBase58());
    //   const solBalance =
    //     (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
    //   const usdtBalance = await connection.getTokenAccountBalance(
    //     new PublicKey(USDTAddress)
    //   );
    // }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/google-save-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("Fetched data: ", result);
      if (result.status === "success") {
        const data = result.data.map((item: any) => {
          return {
            wallet: item[0],
            amountPait: Number(item[1]?.replaceAll(",", "")),
            amountUSD: Number(item[2]?.replaceAll(",", "")),
          };
        });
        console.log("Data: ", data);
        setData(data);
        const totalAmountPaid = data.reduce(
          (sum: number, item: any) => sum + Number(item.amountPait),
          0
        );
        console.log("Total amount paid: ", totalAmountPaid);
        setAllocations({
          bought: 0,
          total: allocations.total,
        });
      } else {
        console.log("Error fetching data.");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const content = [
    {
      title: "Unlock Schedule",
      description:
        "10% at TGE, 1-month cliff, and the rest vests over 5 months.",
    },
    {
      title: "Limited Supply",
      description: "2,000,000 PAiT Tokens available in the Private Round",
    },
    {
      title: "TGE",
      description: "Token Generation Event (TGE) on December 10th, 2024",
    },
  ];

  const reset = () => {
    setIsMoonPayEnabled(false);
    setIsTransakEnabled(false);
    setPaymentModal(false);
  };

  const saveRecord = async () => {
    console.log("Amount InUsd", amountInUsd);
    setAmountInPait((Number(amountInUsd) / Number(priceOfPait)).toString());
    try {
      const response = await createPurchase({
        user_wallet: publicKey?.toBase58()!,
        user_name: publicKey?.toBase58()!,
        pait_tokens: Number(amountInPait),
        usdc_amount: Number(amountInUsd),
        referral: referralCode,
      });
      // const response = await fetch("/api/google-save-data", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     data: {
      //       user: publicKey?.toBase58(),
      //       usd: amountInUsd,
      //       pait: amountInPait,
      //       referral: referralCode,
      //     },
      //   }),
      // });

      if (response.status === "success") {
        toast.success(response.message);
        await fetchData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error saving data.");
      console.error(error);
    }
    if (!connected || !wallet || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }
  };

  const peformTrade = useCallback(async () => {
    // show KYC verification

    reset();
    console.log("Connected Wallet: ", connected);
    console.log("Public Key: ", publicKey);
    console.log("Wallet: ", wallet);

    if (amountInUsd === "0") {
      toast.error("Please enter a valid amount");
      return;
    }

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
      console.log("Mint", mintPublicKey);
      console.log("Payment Method: ", paymentMethod);

      if (paymentMethod == "card") {
        setIsMoonPayEnabled(false);
        setIsTransakEnabled(false);
        setPaymentModal(true);
      } else {
        reset();
      }

      saveRecord();

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
      toast.success(`Successfully participated in the Pre-Sale`);
      await fetchData();
    } catch (error) {
      console.error("Error sending USDT:", error);
      toast.error(`Error sending USDT`);
    }
  }, [
    amountInPait,
    setAmountInPait,
    amountInUsd,
    connected,
    publicKey,
    paymentMethod,
    setPaymentMethod,
    USDTAddress,
    recipientAddress,
    saveRecord,
    wallet,
  ]);

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
            isInValid={isInValid}
            isConnected={connected}
            mininumAmount={mininumAmount}
            maximumAmount={maximumAmount}
            amountInPait={amountInPait}
            setIsMoonPayEnabled={setIsMoonPayEnabled}
            setPaymentModal={setPaymentModal}
            setIsTransakEnabled={setIsTransakEnabled}
            paymentModal={paymentModal}
            isMoonPayEnabled={isMoonPayEnabled}
            isTransakEnabled={isTransakEnabled}
            amountInUsd={amountInUsd}
            setAmountInUsd={setAmountInUsd}
            endDateTime={endDateTime}
            buyPait={peformTrade}
            priceOfPait={priceOfPait}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            referralCode={referralCode}
            setReferralCode={setReferralCode}
          />
        </FlexItem>
        <FlexItem>
          <Content>
            <PageAdvertisement>
              <PageAdvertisementIcon src="/hamster.svg" />
            </PageAdvertisement>

            <PageTitle>PAiT PRIVATE ROUND</PageTitle>

            <PageContent>
              <PageSubTitle>Steps to Acquire PAiT Tokens</PageSubTitle>
              <PageDescription>
                1. Connect your Phantom Wallet on the Solana
                <a href="https://phantom.app" target="_blank">
                  <span style={{ marginRight: "0.3rem" }}></span>{" "}
                  {"  Phantom Wallet "}
                </a>
              </PageDescription>
              <PageDescription>
                {" "}
                2. Complete KYC (Know Your Customer) verification
              </PageDescription>
              <PageDescription onClick={() => setOpenModal(!openModal)}>
                3.
                <span
                  style={{
                    color: "#2b5dfb",
                    marginRight: "4px",
                    marginLeft: "4px",
                    cursor: "pointer",
                  }}
                >
                  {"  "}
                  Read the SAFT Agreement
                </span>{" "}
                before making a purchase
              </PageDescription>
              <ModalSection
                title="Read the SAFT Agreement"
                setIsOpen={setOpenModal}
                isOpen={openModal}
              >
                <ReadAgreement>
                  <SignaturePad showSignature={false} />
                </ReadAgreement>
              </ModalSection>
              <PageDescription>
                4. Enter the USDCvalue you wish to use for the purchase, then
                press the "Buy PAiT" button
              </PageDescription>
              <PageDescription>
                5. Sign the SAFT Agreement and provide your email address to
                receive a copy
              </PageDescription>
              <PageDescription>
                {" "}
                6. Get your referral code, share it, and earn extra PAiT tokens
              </PageDescription>
            </PageContent>
            <ReferralCodeShare referralCode="somesess" />
            {content.map((item, index) => (
              <PageContent key={index}>
                <PageSubTitle>{item.title}</PageSubTitle>
                <PageDescription>{item.description}</PageDescription>
              </PageContent>
            ))}

            <TermsAndCondition onClick={() => setIsTermsModal(!isTermsModal)}>
              Terms and conditions apply
            </TermsAndCondition>

            <ModalSection
              title="Terms and Conditions"
              setIsOpen={setIsTermsModal}
              isOpen={isTermsModal}
            >
              <ReadAgreement>
                <TermsAndConditions />
              </ReadAgreement>
            </ModalSection>
          </Content>
        </FlexItem>
      </FlexBox>

      <ModalSection
        isOpen={paymentModal}
        setIsOpen={setPaymentModal}
        title="Pay With Card"
      >
        <WertOnRamp
          inputValue={inputValue}
          setIsDrawerOpen={setIsMoonPayEnabled}
          setVisible={setIsMoonPayEnabled}
          visible={isMoonPayEnabled}
          tokenSymbol={symbol}
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

  @media ${devices.mobile} {
    padding: 1rem;
    gap: 0.5rem;
  }

  @media ${devices.tablet} {
    padding: 1rem;
    gap: 0.5rem;
  }

  @media ${devices.desktop} {
  }
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

const TermsAndCondition = styled.div`
  font-size: 14px;
  color: #7c8cae;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  font-weight: 600;
  line-height: 1.1rem;
`;

const ReadAgreement = styled.div`
  height: 500px;
  overflow-y: auto;
`;
