"use client";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { ModalSection } from "@/components/modal/Modal";
import { FlexBox } from "@/components/common/Common";
import { FlexItem } from "@/components/common/Common.styled";
import { BuyCard } from "@/components/buyCard/BuyCard";
import { devices, formatNumber } from "@/utils/common";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import toast from "react-hot-toast";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  getAccount,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { useRouter } from "next/navigation";
import WertOnRamp from "@/components/OnOffRamp/WertOnRamp";
import SignaturePad from "@/components/SaftDocument";
import { ReferralCodeShare } from "@/components/ReferralCodeShare";
import TermsAndConditions from "@/components/TermsAndConditions";
import { SOLANA_CONNECTION } from "@/utils/helper";
import { User } from "@prisma/client";

export default function Home() {
  // const publicKey = new PublicKey(
  //   "BZVcwX2hXp3X2L3su91UW2ti7XTedW9ncTBc3HfRx8zV"
  // );
  const { connected, publicKey, sendTransaction, signTransaction } =
    useWallet();

  const wallet = useWallet();

  const [isMoonPayEnabled, setIsMoonPayEnabled] = useState<boolean>(false);
  const [isTransakEnabled, setIsTransakEnabled] = useState<boolean>(false);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [data, setData] = useState<
    Array<{ wallet: string; amountPait: number; amountUSD: number }>
  >([]);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isTermsModal, setIsTermsModal] = useState<boolean>(false);

  const [allowReferral, setAllowReferral] = useState(false);
  // used to get the user code from the URL
  const [user, setUser] = useState<User | null>(null);

  const [balances, setBalances] = useState<{ sol: string; usdt: string }>({
    sol: "0",
    usdt: "0",
  });

  const [symbol, setSymbol] = useState("USDC");
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
      createNewUser()
        .then((_result) => {})
        .catch((_error) => {});
      // retrieve the saved user
      getUserInfo()
        .then(() => {})
        .catch(() => {});

      if (user) {
        if (!user.is_approved) {
          router.push("/kyc");
        }
      }
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

  const createNewUser = async () => {
    if (publicKey) {
      try {
        const response = await fetch("/api/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wallet: publicKey?.toBase58() }),
        });
        const result = await response.json();
        if (result.status === "success") {
          setUser(result.user);
        } else {
        }
      } catch (error) {}
    }
  };

  const createNewPurchase = async (data: {
    user_id: number;
    pait_tokens: number;
    usdc_amount: number;
    usedReferral: string;
  }) => {
    try {
      const response = await fetch("/api/create-purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return {
        status: "success",
        message: "Purchase created successfully",
        purchase: result?.status === "success" ? result.purchase : null,
      };
    } catch (error) {
      return {
        status: "error",
        message: "Failed to create purchase",
        purchase: null,
      };
    }
  };
  const getUserInfo = async () => {
    try {
      const response = await fetch(`/api/get-user/${publicKey?.toBase58()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status === "success" && result.user) {
        setUser(result.user);
      } else {
      }
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/purchases", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status === "success") {
        const totalAmountPaid = result?.purchases?.reduce(
          (sum: number, item: any) => sum + Number(item.pait_tokens),
          0
        );

        const isUserPaid = result?.purchases?.filter((item: any) => {
          return item.user.wallet === publicKey?.toBase58();
        });

        console.log("isUserPaid: ", isUserPaid);
        // Check if isUserPaid array has any items
        if (isUserPaid.length > 0) {
          setAllowReferral(true);
        }

        console.log("Purchases: ", result);
        console.log("totalAmountPaid: ", totalAmountPaid);
        setAllocations({
          bought: totalAmountPaid,
          total: allocations.total,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const content = [
    {
      title: "Limited Supply",
      description: "2,000,000 PAiT Tokens available in the Private Round",
    },
    {
      title: "Unlock Schedule",
      description:
        "5% at TGE, 3-month cliff, and the rest vests over 9 months.",
    },
  ];

  const reset = () => {
    setIsMoonPayEnabled(false);
    setIsTransakEnabled(false);
    setPaymentModal(false);
  };

  const sendTransactionWithRetry = async (
    transaction: Transaction,
    retries = 3
  ) => {
    while (retries > 0) {
      if (signTransaction) {
        try {
          const signedTransaction = await signTransaction(transaction);
          const txid = await SOLANA_CONNECTION.sendRawTransaction(
            signedTransaction.serialize()
          );
          console.log("USDC transaction sent:", txid);
          toast.success(`Transaction successful: ${txid}`);
          return txid;
        } catch (error) {
          console.error("Error sending USDC:", error);
          retries -= 1;
          if (retries === 0) {
            toast.error("Error transferring USDC. Please try again later.");
            throw new Error("Error transferring USDC");
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    }
  };

  const sendUSDC = useCallback(
    async (amount: number) => {
      if (!connected || !publicKey || !signTransaction) {
        toast.error(
          "Wallet is not connected or signTransaction is unavailable."
        );
        return;
      }

      const recipientPublicKey = new PublicKey(process.env.PAIT_ADDRESS!);
      // USDC address
      const mintPublicKey = new PublicKey(
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      );

      // let currentSlot = 0;

      // try {
      //   currentSlot = await SOLANA_CONNECTION.getSlot();
      //   console.log("Current Slot (Block Number):", currentSlot);
      //   return currentSlot;
      // } catch (error) {
      //   console.error("Error fetching current slot:", error);
      // }
      const { blockhash } = await SOLANA_CONNECTION.getLatestBlockhash();

      // console.log(`
      //   Slot: ${currentSlot},
      //   Block Hash: ${blockhash}`);

      // Get the sender's associated token address for USDC
      const senderTokenAddress = await getAssociatedTokenAddress(
        mintPublicKey,
        publicKey
      );
      // Get the recipient's associated token address for USDC
      const recipientTokenAddress = await getAssociatedTokenAddress(
        mintPublicKey,
        recipientPublicKey
      );

      const transaction = new Transaction();

      // Check if the sender's token account exists
      try {
        await getAccount(SOLANA_CONNECTION, senderTokenAddress);
      } catch (error) {
        console.log("Sender's token account does not exist. Creating...");
        const createAccountInstruction =
          createAssociatedTokenAccountInstruction(
            publicKey, // payer
            senderTokenAddress,
            publicKey, // owner
            mintPublicKey
          );
        transaction.add(createAccountInstruction);
      }

      // Check if the recipient's token account exists
      try {
        await getAccount(SOLANA_CONNECTION, recipientTokenAddress);
      } catch (error) {
        console.log("Recipient's token account does not exist. Creating...");
        const createRecipientAccountInstruction =
          createAssociatedTokenAccountInstruction(
            publicKey, // payer
            recipientTokenAddress,
            recipientPublicKey, // owner
            mintPublicKey
          );
        transaction.add(createRecipientAccountInstruction);
      }

      // Create transfer instruction
      const transferInstruction = createTransferInstruction(
        senderTokenAddress,
        recipientTokenAddress,
        publicKey,
        amount * 10 ** 6 // USDC has 6 decimal places
      );

      transaction.add(transferInstruction);
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      try {
        // Sign and send the transaction
        const signedTransaction = await signTransaction(transaction);
        const txid = await SOLANA_CONNECTION.sendRawTransaction(
          signedTransaction.serialize()
        );
        console.log("USDC transaction sent:", txid);
        toast.success(`Transaction successful`);
      } catch (error) {
        console.error("Error sending USDC:", error);
        toast.error("Error transferring USDC");
        throw new Error("Error transferring USDC");
      }
    },
    [connected, publicKey, signTransaction]
  );

  const handlePayment = async (amount: number) => {
    try {
      await sendUSDC(amount);
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
        const response = await createNewPurchase({
          user_id: user.id,
          pait_tokens: Number(amountInPait),
          usdc_amount: Number(amountInUsd),
          usedReferral: referralCode,
        });

        return response;

        // if (response.status === "success") {
        // toast.success(response.message);
        // router.push(`/sign/${response.purchase?.id}`);
        // } else {
        //   toast.error(response.message);
        // }
      }

      return {
        status: "failed",
        message: "Failed, Not connected wallet",
        purchase: null,
      };
    } catch (error) {
      return {
        status: "error",
        message: "failed",
        purchase: null,
      };
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
        const resp = await saveRecord();
        if (resp.purchase) {
          router.push(`/sign/${resp?.purchase?.id}`);
        }
      }
    } catch (error) {
      toast.error(`Error sending USDC`);
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
                <PageDescriptionContext>
                  <ExternalLink href="https://phantom.app" target="_blank">
                    {" Phantom Wallet "}
                  </ExternalLink>
                </PageDescriptionContext>
              </PageDescription>
              <PageDescription>
                {" "}
                2. Complete KYC (Know Your Customer) verification
              </PageDescription>
              <PageDescription onClick={() => setOpenModal(!openModal)}>
                3.
                <PageDescriptionContext>
                  Read the SAFT Agreement
                </PageDescriptionContext>
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
                4. Enter the USDC value you wish to use for the purchase, then
                press the "Buy PAiT" button
              </PageDescription>
              <PageDescription>
                5. Sign the SAFT Agreement and provide your email address to
                receive a copy
              </PageDescription>
              <PageDescription>
                {" "}
                6. Share your referral code and earn 7.5% extra from purchases.
                Referral pool 150,000 PAiT tokens, fully unlocked at TGE
              </PageDescription>
            </PageContent>

            {user?.referral && allowReferral && (
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

            <Terms>
              Token sale will be conducted ONLY through via PAiT page/launchpad
              or any other outlets that will be announced through PAiT official
              channels. DO NOT purchase tokens in any other platforms that are
              not announced in the official PAiT channels. PAiT team will NOT
              contact anyone directly with any offers of any kind" to the
              presale home page nearb by terms and conditions. That text should
              be marked/bolded.
            </Terms>

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
  text-align: left;

  @media ${devices.mobile} {
    font-size: 18px;
    text-align: left;
  }
`;

const PageAdvertisement = styled.div`
  width: 100%;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  text-align: left;

  @media ${devices.mobile} {
    text-align: left;
  }
`;

const PageAdvertisementIcon = styled.img`
  width: 100%;
`;

const PageDescription = styled.p`
  color: #e0e5f0;
  display: flex;
  text-align: left;

  @media ${devices.mobile} {
    font-size: 10px !important;
    text-align: left;
  }
`;

const PageDescriptionContext = styled.b`
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  padding: 0 2px !important;

  @media ${devices.desktop} {
    border-bottom: 2px solid #fff;
  }

  @media ${devices.mobile} {
    text-align: left;
  }
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1rem;
  text-align: left;

  @media ${devices.mobile} {
    padding: 1rem;
    gap: 0.5rem;
    text-align: left;
  }

  @media ${devices.tablet} {
    padding: 1rem;
    gap: 0.5rem;
  }
`;

const PageSubTitle = styled.h5`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #afbad2;
  line-height: 1.7rem;
  text-align: left;

  @media ${devices.mobile} {
    font-size: 14px;
    text-align: left;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  text-align: left;

  @media ${devices.mobile} {
    text-align: left;
  }

  @media ${devices.desktop} {
    width: 30rem;
    padding: 0 2rem;
    text-align: left;
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
  text-align: left;

  @media ${devices.mobile} {
    text-align: left;
  }
`;

const Terms = styled.p`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
  @media ${devices.mobile} {
    font-size: 1.5rem !important;
  }
`;

const ReadAgreement = styled.div`
  height: 500px;
  overflow-y: auto;
  text-align: left;

  @media ${devices.mobile} {
    text-align: left;
  }
`;

const ExternalLink = styled.a`
  text-align: left;
`;
