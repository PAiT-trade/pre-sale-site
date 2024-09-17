"use client";
import React, { useEffect } from "react";
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
  setIsTransakEnabled: (value: boolean) => void;
  setIsMoonPayEnabled: (value: boolean) => void;
  setPaymentModal: (value: boolean) => void;
  buyPait: () => Promise<void>;
  setAmountInUsd: (amount: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export const BuyCard: React.FC<BuyCardProps> = ({
  allocations,
  amountInPait,
  amountInUsd,
  endDateTime,
  isConnected,
  priceOfPait,
  buyPait,
  setPaymentMethod,
  paymentMethod,
  isInValid,
  setAmountInUsd,
  mininumAmount,
  maximumAmount,
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
        <BuyCardHeaderSubTitle>Pre-sale round 1</BuyCardHeaderSubTitle>
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
            1 $PAiT = {formatNumber(Number(priceOfPait))} USDT
          </BText>
        </BuyCardHeaderAllocationWrapper>
      </BuyCardHeader>
      <CountdownTimer targetDate={endDateTime} />
      <BuyCardActionWrapper>
        <BuyCardsText>Choose payment method</BuyCardsText>
        <BuyCardActionButtonWrapper>
          <BuyCardActionButton
            bgcolor={paymentMethod == "usdt" ? "#131928" : ""}
            onClick={() => setPaymentMethod("usdt")}
          >
            <BuyCardActionButtonIcon>
              <BuyCardControlInputIcon src="/usdt_icon.svg" />
            </BuyCardActionButtonIcon>

            <BuyCardActionButtonText>Wallet</BuyCardActionButtonText>
          </BuyCardActionButton>

          <BuyCardActionButton
            bgcolor={paymentMethod == "card" ? "#131928" : ""}
            onClick={() => setPaymentMethod("card")}
          >
            <BuyCardActionButtonIcon>
              <CreditCardIcon size={16} />
            </BuyCardActionButtonIcon>
            <BuyCardActionButtonText>Credit Card</BuyCardActionButtonText>
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

          <BuyCardControlButton
            onClick={() => {
              // router.push("/kyc");
              buyPait();
            }}
          >
            {isConnected ? "Buy PAiT" : "Connect Wallet"}
          </BuyCardControlButton>
        </BuyCardControlGroup>
      </BuyCardActionWrapper>

      {!isConnected ? (
        <Link href={"/wallet"}>
          <DontHaveWallet href="#" target="_blank">
            Do not have wallet?
          </DontHaveWallet>
        </Link>
      ) : null}
    </BuyCardContainer>
  );
};
