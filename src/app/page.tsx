"use client";
import { useState } from "react";
import styled from "styled-components";
import MoonPayOnRamp from "@/components/OnOffRamp/MoonPay";
import TransakOnOffRamp from "@/components/OnOffRamp/TransakOnOffRamp";
import { Button } from "@/components/button/Button";
import { CreditCardIcon } from "lucide-react";
import { ModalSection } from "@/components/modal/Modal";
import { FlexBox } from "@/components/common/Common";
import { FlexItem } from "@/components/common/Common.styled";
export default function Home() {
  const [isMoonPayEnabled, setIsMoonPayEnabled] = useState<boolean>(false);
  const [isTransakEnabled, setIsTransakEnabled] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>("");
  const tokenSymbol = "SOL";

  const [paymentModal, setPaymentModal] = useState<boolean>(false);

  return (
    <>
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
          tokenSymbol={tokenSymbol}
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
      <FlexBox
        direction="row"
        justify="space-between"
        align="center"
        gap="2rem"
        margin="0px"
        wrap="nowrap"
      >
        <FlexItem>
          <Button
            label="Pay with Card"
            icon={<CreditCardIcon />}
            onClick={() => setPaymentModal(!paymentModal)}
          />
        </FlexItem>
        <FlexItem>
          <PageTitle>Congratulations and Welcome!</PageTitle>
          <PageAdvertisement>
            <PageAdvertisementIcon src="/hamster.svg" />
          </PageAdvertisement>
          <PageDescription>
            Buy our pre-sale tokens for a huge public sale discount.
          </PageDescription>
          <PageSubTitle>Allocations are going fast!</PageSubTitle>

          <PageRules>
            <PageRulesTitle>PAiT DEX</PageRulesTitle>

            <PageDescription>Pump your gains with no effort</PageDescription>
            <PageDescription>
              Copy trade your way to generational wealth.
            </PageDescription>

            <Rules>
              <Rule>Play the Game Daily</Rule>
              <Rule>Invite Friends Daily</Rule>
            </Rules>

            <LearnMoreButton> Learn More </LearnMoreButton>
          </PageRules>
        </FlexItem>
      </FlexBox>
    </>
  );
}

const PageTitle = styled.h3`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 2.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
`;

const PageAdvertisement = styled.div`
  width: 100%;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
`;
const PageAdvertisementIcon = styled.img``;

const PageDescription = styled.p`
  font-size: 1rem;
  color: #e4e7f0;
  text-align: left;
`;

const PageSubTitle = styled.h5``;

const PageRules = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 2rem;
  gap: 1rem;
`;

const PageRulesTitle = styled(PageTitle)`
  color: #000;
  font-size: 1.2rem;
`;

const Rules = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style-type: square;
`;
const Rule = styled.li`
  color: #5f30a0;
`;

const LearnMoreButton = styled.button`
  background-color: #306c6d;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #fff;
  border: none;
  outline-width: 0;
  width: 100%;
  font-size: 14px;
`;

// Payment Card
export const PaymentCard = styled.div``;
export const PaymentCardHeader = styled.div``;
export const PaymentCardBody = styled.div``;
export const PaymentCardFooter = styled.div``;
export const PaymentCardLabel = styled.span``;
export const PaymentCardSubLabel = styled.span``;
export const PaymentCardIconWrapper = styled.span``;
export const PaymentCardContainer = styled.div``;
export const PaymentCardFlex = styled.div``;

// timer counter
export const Timer = styled.div``;
export const TimerLabel = styled.span``;
export const TimerContainer = styled.div``;
