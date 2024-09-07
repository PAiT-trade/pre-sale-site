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
  BoughtCardSubTitle,
  BoughtCardTitle,
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
} from "./BuyCard.styled";
import { ProgressBar } from "../PogressBar";
import { CountdownTimer } from "../CountdownTimer";
import { FlexBox } from "../common/Common";
import { Dot, FlexItem } from "../common/Common.styled";
import { CreditCardIcon } from "lucide-react";

interface BuyCardProps {}
export const BuyCard: React.FC<BuyCardProps> = () => {
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
              <BText>1,500,000 / 4,000,000</BText>
            </BuyCardHeaderAllocationValue>
          </BuyCardHeaderAllocationHeader>

          <ProgressBar progress={30} />

          <BText color="#4daa90">1 $PAiT = 0.30 USDT</BText>
        </BuyCardHeaderAllocationWrapper>
      </BuyCardHeader>
      <CountdownTimer targetDate="2024-10-24T00:00:00" />

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
            method={paymentMethod}
            onClick={() => setPaymentMethod("usdt")}
          >
            <BuyCardActionButtonIcon>
              <Dot />
            </BuyCardActionButtonIcon>
            <BuyCardActionButtonText>USDT(SOL)</BuyCardActionButtonText>
          </BuyCardActionButton>

          <BuyCardActionButton
            method={paymentMethod}
            onClick={() => setPaymentMethod("card")}
          >
            <BuyCardActionButtonIcon>
              <CreditCardIcon size={16} />
            </BuyCardActionButtonIcon>
            <BuyCardActionButtonText>Credit Card</BuyCardActionButtonText>
          </BuyCardActionButton>
        </BuyCardActionButtonWrapper>

        {/* <BuyCardControlGroup>
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
                <BuyCardControlInput />
                <Dot bgColor="#4daa90" />
              </BuyCardControlInputControl>
            </BuyCardControlInputGroup>
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
                <BuyCardControlInput />
                <Dot bgColor="#4daa90" />
              </BuyCardControlInputControl>
            </BuyCardControlInputGroup>
          </BuyCardInputs>

          <BuyCardActions></BuyCardActions>
        </BuyCardControlGroup> */}
      </BuyCardActionWrapper>
    </BuyCardContainer>
  );
};

/**
 * export const BuyCardControlGroup = styled.div``;
export const BuyCardControlInputGroup = styled.div``;
export const BuyCardControlInputLabel = styled.label``;
export const BuyCardControlInputControl = styled.div``;
export const BuyCardControlInput = styled.input``;

 */
