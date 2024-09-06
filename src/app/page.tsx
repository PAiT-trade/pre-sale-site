"use client";
import { useState } from "react";
import styled from "styled-components";
import MoonPayOnRamp from "@/components/OnOffRamp/MoonPay";
import TransakOnOffRamp from "@/components/OnOffRamp/TransakOnOffRamp";
import { ModalSection } from "@/components/modal/Modal";
import { FlexBox } from "@/components/common/Common";
import { FlexItem } from "@/components/common/Common.styled";
import { BuyCard } from "@/components/buyCard/BuyCard";
export default function Home() {
  const [isMoonPayEnabled, setIsMoonPayEnabled] = useState<boolean>(false);
  const [isTransakEnabled, setIsTransakEnabled] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>("");
  const tokenSymbol = "SOL";

  const [paymentModal, setPaymentModal] = useState<boolean>(false);

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

          <BuyCard />
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
    </>
  );
}

const PageTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 1rem;
  line-height: 2.5rem;
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
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
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
  width: 608px;
  gap: 1rem;
`;
