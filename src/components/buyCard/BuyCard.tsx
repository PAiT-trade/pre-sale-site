"use client";
import React, { useState } from "react";
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
  BuyCardActions,
  BuyCardControlButton,
  DontHaveWallet,
} from "./BuyCard.styled";
import { ProgressBar } from "../PogressBar";
import { CountdownTimer } from "../CountdownTimer";
import { FlexBox } from "../common/Common";
import { Dot, FlexItem } from "../common/Common.styled";
import { CreditCardIcon } from "lucide-react";
import { formatNumber } from "@/utils/common";

interface BuyCardProps {
  amountInUsd: number;
  amountInPait: number;
  isConnected: boolean;
  endDateTime: string;
  priceOfPait: number;
  allocations: {
    bought: number;
    total: number;
  };
  buyPait: () => Promise<void>;
  setAmountInUsd: (amount: number) => void;
}
export const BuyCard: React.FC<BuyCardProps> = ({
  allocations,
  amountInPait,
  amountInUsd,
  endDateTime,
  isConnected,
  priceOfPait,
  buyPait,
  setAmountInUsd,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("usdt");
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

          <ProgressBar progress={30} />

          <BText color="#4daa90">
            1 $PAiT = {formatNumber(priceOfPait)} USDT
          </BText>
        </BuyCardHeaderAllocationWrapper>
      </BuyCardHeader>
      <CountdownTimer targetDate={endDateTime} />

      {/* <BoughCard>
        <FlexBox
          direction="row"
          justify="space-between"
          align="center"
          gap="0px"
          margin="0px"
          wrap="nowrap"
        >
          <FlexItem>
            <BoughtCardTitle>10</BoughtCardTitle>
            <BoughtCardSubTitle>Your purchased $PAIT</BoughtCardSubTitle>
          </FlexItem>
          <FlexItem>
            <BoughtCardTitle>10</BoughtCardTitle>
            <BoughtCardSubTitle>Your stakeable $PAIT</BoughtCardSubTitle>
          </FlexItem>
          <FlexItem></FlexItem>
        </FlexBox>
      </BoughCard> */}

      <BuyCardActionWrapper>
        <BuyCardsText>Choose payment method</BuyCardsText>
        <BuyCardActionButtonWrapper>
          <BuyCardActionButton
            selectColor={paymentMethod == "usd" ? "#131928" : ""}
            onClick={() => setPaymentMethod("usdt")}
          >
            <BuyCardActionButtonIcon>
              <Dot />
            </BuyCardActionButtonIcon>
            <BuyCardActionButtonText>USDT</BuyCardActionButtonText>
          </BuyCardActionButton>

          <BuyCardActionButton
            selectColor={paymentMethod == "card" ? "#131928" : ""}
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
              <BuyCardControlInputControl>
                <BuyCardControlInput
                  value={amountInUsd}
                  onChange={(e) =>
                    setAmountInUsd(e.target.value ? Number(e.target.value) : 0)
                  }
                />
                <Dot bgcolor="#4daa90" />
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
                <Dot bgcolor=" #4E4189" />
              </BuyCardControlInputControl>
            </BuyCardControlInputGroup>
          </BuyCardInputs>

          <BuyCardControlButton disabled={!isConnected}>
            {isConnected ? "Buy PAiT" : "Connect Wallet"}
          </BuyCardControlButton>
        </BuyCardControlGroup>
      </BuyCardActionWrapper>

      {!isConnected ? (
        <>
          <DontHaveWallet href="/">Don't have wallet?</DontHaveWallet>
          <DontHaveWallet href="/">Get Terms and conditions</DontHaveWallet>
        </>
      ) : (
        <>
          <DontHaveWallet href="/">Don't have wallet?</DontHaveWallet>
          <DontHaveWallet href="/">Get Terms and conditions</DontHaveWallet>
        </>
      )}
    </BuyCardContainer>
  );
};
