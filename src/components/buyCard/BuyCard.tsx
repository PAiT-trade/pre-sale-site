"use client";
import React, { useEffect, useState } from "react";
import {
  BuyCardContainer,
  BuyCardHeader,
  BuyCardHeaderAllocationHeader,
  BuyCardHeaderAllocationLabel,
  BuyCardHeaderAllocationValue,
  BuyCardHeaderAllocationWrapper,
  BuyCardHeaderSubTitle,
  BuyCardHeaderTitle,
  BuyCardsText as BText,
  BoughCard,
  BuyCardActionWrapper,
  BuyCardsText,
  BuyCardActionButtonWrapper,
  BuyCardActionButton,
  BuyCardActionButtonText,
  BuyCardActionButtonIcon,
  BuyCardControlGroup,
  BuyCardControlInput,
  BuyCardControlInputControl,
  BuyCardControlInputGroup,
  BuyCardControlInputLabelGroup,
  BuyCardControlInputLabelLeft,
  BuyCardControlInputLabelRight,
  BuyCardInputs,
  BuyCardControlButton,
  DontHaveWallet,
  BuyCardControlInputIcon,
  ErrorMessage,
} from "./BuyCard.styled";
import { ProgressBar } from "../PogressBar";
import { CountdownTimer } from "../CountdownTimer";
import { CreditCardIcon } from "lucide-react";
import { formatNumber } from "@/utils/common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WalletButton } from "@/app/solana/solana-provider";
import { Loader } from "../Loader";
import { User } from "@/lib/database";

interface BuyCardProps {
  amountInUsd: string;
  amountInPait: string;
  mininumAmount: string;
  maximumAmount: string;
  isInValid: boolean;
  isConnected: boolean;
  endDateTime: string;
  priceOfPait: string;
  isMoonPayEnabled: boolean;
  isTransakEnabled: boolean;
  paymentModal: boolean;
  allocations: {
    bought: number;
    total: number;
  };
  user: User | null;
  isLoading: boolean;
  setIsTransakEnabled: (value: boolean) => void;
  setIsMoonPayEnabled: (value: boolean) => void;
  setPaymentModal: (value: boolean) => void;
  buyPait: () => Promise<void>;
  setAmountInUsd: (amount: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  referralCode: string;
  setReferralCode: (value: string) => void;
}

export const BuyCard: React.FC<BuyCardProps> = ({
  allocations,
  amountInPait,
  amountInUsd,
  endDateTime,
  isConnected,
  priceOfPait,
  buyPait,
  isLoading,
  setPaymentMethod,
  paymentMethod,
  isInValid,
  setAmountInUsd,
  mininumAmount,
  maximumAmount,
  referralCode,
  user,
  setReferralCode,
}) => {
  useEffect(() => {}, [
    setAmountInUsd,
    isConnected,
    isInValid,
    mininumAmount,
    maximumAmount,
  ]);
  const router = useRouter();

  return (
    <BuyCardContainer>
      <BuyCardHeader>
        <BuyCardHeaderTitle>Buy $PAiT Token</BuyCardHeaderTitle>
        <BuyCardHeaderSubTitle>Private round</BuyCardHeaderSubTitle>
        <BuyCardHeaderAllocationWrapper>
          <BuyCardHeaderAllocationHeader>
            <BuyCardHeaderAllocationLabel>
              <BText>Remaining allocation</BText>
            </BuyCardHeaderAllocationLabel>
            <BuyCardHeaderAllocationValue>
              <BText>
                {formatNumber(allocations.bought)} /{" "}
                {formatNumber(allocations.total)}
              </BText>
            </BuyCardHeaderAllocationValue>
          </BuyCardHeaderAllocationHeader>

          <ProgressBar
            progress={(allocations.bought / allocations.total) * 100}
          />

          <BText color="#4daa90">
            1 $PAiT = {formatNumber(Number(priceOfPait))} USDC
          </BText>
        </BuyCardHeaderAllocationWrapper>
      </BuyCardHeader>
      <CountdownTimer targetDate={endDateTime} />
      <div style={{ padding: "1.2rem 1.6rem 0" }}>
        {referralCode && (
          <>
            <BuyCardControlInputLabelGroup>
              <BuyCardControlInputLabelLeft>
                Referral Code
              </BuyCardControlInputLabelLeft>
            </BuyCardControlInputLabelGroup>
            <BuyCardControlInputControl>
              <BuyCardControlInput
                type="text"
                placeholder="Referral Code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </BuyCardControlInputControl>
          </>
        )}
      </div>
      <BuyCardActionWrapper>
        {/* <BuyCardsText>Choose payment method</BuyCardsText> */}
        <BuyCardActionButtonWrapper>
          <BuyCardActionButton
            bgcolor={paymentMethod == "usdt" ? "#131928" : ""}
            onClick={() => setPaymentMethod("usdt")}
          >
            <BuyCardActionButtonIcon>
              <BuyCardControlInputIcon src="/usdt_icon.svg" />
            </BuyCardActionButtonIcon>

            <BuyCardActionButtonText>USDC</BuyCardActionButtonText>
          </BuyCardActionButton>

          <BuyCardActionButton
            bgcolor="#3a4662"
            onClick={() => setPaymentMethod("card")}
          >
            {/* <BuyCardActionButtonIcon>
              <CreditCardIcon size={16} />
            </BuyCardActionButtonIcon>
            <BuyCardActionButtonText>Credit Card</BuyCardActionButtonText> */}
          </BuyCardActionButton>
        </BuyCardActionButtonWrapper>

        <BuyCardControlGroup>
          <BuyCardInputs>
            <BuyCardControlInputGroup>
              <BuyCardControlInputLabelGroup>
                <BuyCardControlInputLabelLeft>
                  Pay with $USDT
                </BuyCardControlInputLabelLeft>
                <BuyCardControlInputLabelRight>
                  Max
                </BuyCardControlInputLabelRight>
              </BuyCardControlInputLabelGroup>
              <BuyCardControlInputControl error={isInValid ? "red" : ""}>
                <BuyCardControlInput
                  value={amountInUsd}
                  onChange={(e) => setAmountInUsd(e.target.value)}
                />
                <BuyCardControlInputIcon src="/usdt_icon.svg" />
              </BuyCardControlInputControl>
            </BuyCardControlInputGroup>
            <BuyCardControlInputGroup>
              <BuyCardControlInputLabelGroup>
                <BuyCardControlInputLabelLeft>
                  $PAiT you receive
                </BuyCardControlInputLabelLeft>
                <BuyCardControlInputLabelRight>
                  {/* Max */}
                </BuyCardControlInputLabelRight>
              </BuyCardControlInputLabelGroup>
              <BuyCardControlInputControl>
                <BuyCardControlInput disabled={true} value={amountInPait} />
                <BuyCardControlInputIcon src="/pait_icon.svg" />
              </BuyCardControlInputControl>
            </BuyCardControlInputGroup>
          </BuyCardInputs>

          {isInValid && (
            <ErrorMessage>
              Min: ${formatNumber(Number(mininumAmount))} & Max: $
              {formatNumber(Number(maximumAmount))}
            </ErrorMessage>
          )}
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <BuyCardControlButton
              onClick={() => {
                if (isConnected) {
                  if (user) {
                    if (user.is_approved == 0 || !user) {
                      router.push("/kyc");
                    }
                  } else {
                    buyPait();
                  }
                }
              }}
            >
              {isConnected ? (
                "Buy PAiT"
              ) : (
                <WalletButton> Connect Wallet </WalletButton>
              )}
            </BuyCardControlButton>
          )}
        </BuyCardControlGroup>
      </BuyCardActionWrapper>

      {/* {!isConnected ? (
        <Link href={"/wallet"}>
          <DontHaveWallet href="#" target="_blank">
            Do not have wallet?
          </DontHaveWallet>
        </Link>
      ) : null} */}
    </BuyCardContainer>
  );
};
