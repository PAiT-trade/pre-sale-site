"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MoonPayOnRamp from "@/components/OnOffRamp/MoonPay";
import TransakOnOffRamp from "@/components/OnOffRamp/TransakOnOffRamp";
import { ModalSection } from "@/components/modal/Modal";
import { FlexBox } from "@/components/common/Common";
import { FlexItem } from "@/components/common/Common.styled";
import { BuyCard } from "@/components/buyCard/BuyCard";
import { Grid } from "styled-css-grid";
import { devices } from "@/utils/common";
import { useWallet } from "@solana/wallet-adapter-react";
export default function Home() {
  const { connected, wallet, autoConnect } = useWallet();

  const [isMoonPayEnabled, setIsMoonPayEnabled] = useState<boolean>(false);
  const [isTransakEnabled, setIsTransakEnabled] = useState<boolean>(false);
  const [symbol, setSymbol] = useState("USDT");
  const [] = useState("ERgpvPPvSYnqTNay5uFRvcCiHYF48g9VkqXw8NroFepx");

  const [inputValue, setInputValue] = useState<string>("");

  const [paymentModal, setPaymentModal] = useState<boolean>(false);

  const [allocations, setAllocations] = useState<{
    bought: number;
    total: number;
  }>({
    bought: 1500000,
    total: 4000000,
  });
  const [amountInUsd, setAmountInUsd] = useState<number>(20);
  const [amountInPait, setAmountInPait] = useState<number>(1);
  const [endDateTime, setEndDateTime] = useState<string>("2024-10-24T00:00:00");
  const [priceOfPait, setPriceOfPait] = useState<number>(0.3);

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

  const buyPait = async () => {};

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
            buyPait={buyPait}
            priceOfPait={priceOfPait}
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
  gap: 1rem;

  @media ${devices.mobile} {
  }

  @media ${devices.tablet} {
  }

  @media ${devices.desktop} {
    width: 38rem;
    padding: 0 2rem;
  }
`;
