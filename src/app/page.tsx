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
import * as splToken from "@solana/spl-token";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  Connection,
} from "@solana/web3.js";
import toast from "react-hot-toast";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  transfer,
  getAccount,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import * as Veriff from "@veriff/js-sdk";
import { CONFIGS } from "@/config";
import { VerifyKYC } from "@/components/kyc/VerifyKYC";
import { useRouter } from "next/navigation";
import WertOnRamp from "@/components/OnOffRamp/WertOnRamp";
import SignaturePad from "@/components/SaftDocument";
import { db } from "@/lib/database";
import { ReferralCodeShare } from "@/components/ReferralCodeShare";
import TermsAndConditions from "@/components/TermsAndConditions";
import { createUser, getUser, createPurchase } from "@/db/prisma";
import {
  WalletNotConnectedError,
  SignerWalletAdapterProps,
} from "@solana/wallet-adapter-base";
import { SOLANA_CONNECTION } from "@/utils/helper";
import { User } from "@prisma/client";

export default function Home() {
  const { connected, publicKey, sendTransaction, signTransaction } =
    useWallet();

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
  const [amountInUsd, setAmountInUsd] = useState("2");
  const [mininumAmount, setMinimumAmount] = useState("2");
  const [isInValid, setInValid] = useState(false);
  const [maximumAmount, setMaximumAmount] = useState("20000");
  const [amountInPait, setAmountInPait] = useState("1");
  const [endDateTime, setEndDateTime] = useState<string>("2024-12-10T00:00:00");
  const [priceOfPait, setPriceOfPait] = useState("0.16");
  const [paymentMethod, setPaymentMethod] = useState<string>("usdc");
  const [referralCode, setReferralCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Read referral code from URL
  useEffect(() => {
    console.log("URL: ", window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("referral");
    if (myParam) {
      setReferralCode(myParam);
    }
  }, [router]);

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
      // save user to db
      createUser({ wallet: publicKey?.toBase58()! })
        .then((result) => {
          console.log("Successfully ->: ", result);
        })
        .catch((error) => {
          console.log("Error Creating User: ", error);
        });
      // retrieve the saved user

      getUser(publicKey?.toBase58()!)
        .then((result) => {
          console.log("User: ", result);
          if (result?.user) {
            setUser(result?.user);
          }
        })
        .catch((error) => {
          console.log("Error:  ", error);
        });
    }
  }, [connected, wallet, publicKey, user]);

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
        "5% at TGE, 3-month cliff, and the rest vests over 9 months.",
    },
    {
      title: "Limited Supply",
      description: "2,000,000 PAiT Tokens available in the Private Round",
    },
    {
      title: "TGE",
      description:
        "Token Generation Event (TGE) Planned on December 10th, 2024",
    },
  ];

  const reset = () => {
    setIsMoonPayEnabled(false);
    setIsTransakEnabled(false);
    setPaymentModal(false);
  };

  const sendUSDC = useCallback(
    async (amount: number) => {
      if (!connected || !publicKey || !signTransaction) {
        console.log(
          "Wallet is not connected or signTransaction is unavailable."
        );
        return;
      }

      const recipientPublicKey = new PublicKey(process.env.PAIT_ADDRESS!);
      // USDC address
      const mintPublicKey = new PublicKey(
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      );

      console.log("Recipient Address: ", recipientPublicKey.toBase58());
      console.log("Sender Address: ", publicKey.toBase58());
      console.log("Amount: ", amount);

      const { blockhash } = await SOLANA_CONNECTION.getLatestBlockhash();

      // Get the sender's associated token address for USDC
      const senderTokenAddress = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );

      console.log("Sender Token Address: ", senderTokenAddress.toBase58());

      // Get the recipient's associated token address for USDC
      const recipientTokenAddress = await getAssociatedTokenAddress(
        mintPublicKey,
        recipientPublicKey
      );

      // Create transfer instruction
      // TODO: 2 * 10 ** 6 is the amount in USDC, this should be dynamic
      const transferInstruction = createTransferInstruction(
        senderTokenAddress,
        recipientTokenAddress,
        publicKey,
        2 * 10 ** 6 // USDC has 6 decimal places, so convert the amount accordingly
      );

      const transaction = new Transaction().add(transferInstruction);
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      try {
        // Sign and send the transaction
        const signedTransaction = await signTransaction(transaction);
        const txid = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );
        console.log("USDC transaction sent:", txid);
        toast.success(`Transaction successful: ${txid}`);
      } catch (error) {
        console.error("Error sending USDC:", error);
        toast.error(`Error sending USDC: ${error}`);
        throw Error("Error sending USDC");
      }
    },
    [
      connected,
      publicKey,
      signTransaction,
      connection,
      recipientAddress,
      Number(amountInUsd) * 10 ** 6,
    ]
  );

  const handlePayment = async (amount: number) => {
    try {
      await sendUSDC(2);
      return {
        status: "success",
        mesasge: "Transaction successful",
      };
    } catch (error: any) {
      console.error("Error sending USDC:", error);
      return {
        status: "error",
        mesasge: `Error sending USDC: ${error.message}`,
      };
    }
  };
  const saveRecord = async () => {
    setAmountInPait((Number(amountInUsd) / Number(priceOfPait)).toString());
    try {
      if (user) {
        const response = await createPurchase({
          user_id: user.id,
          pait_tokens: Number(amountInPait),
          usdc_amount: Number(amountInUsd),
          usedReferral: referralCode,
        });

        if (response.status === "success") {
          toast.success(response.message);
          await fetchData();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log("Error saving data.");
      console.error(error);
    }
  };

  const peformTrade = useCallback(async () => {
    // show KYC verification

    setIsLoading(true);
    reset();
    if (amountInUsd === "0") {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!connected || !wallet || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const isSent = await handlePayment(Number(amountInUsd));
      if (isSent.status === "success") {
        // saveRecord();
      }
      await fetchData();
    } catch (error) {
      console.error("Error sending USDT:", error);
      toast.error(`Error sending USDT`);
    }

    setIsLoading(false);
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
            isLoading={isLoading}
            amountInPait={amountInPait}
            user={user}
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
                <a
                  href="https://phantom.app"
                  target="_blank"
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    borderBottom: "2px solid #fff",
                  }}
                >
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
                    color: "#fff",
                    fontWeight: "bold",
                    borderBottom: "2px solid #fff",
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

            {user?.referral && (
              <ReferralCodeShare referralCode={user?.referral} />
            )}

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
