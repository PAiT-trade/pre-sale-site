"use client";
import {
  OptionDescription,
  OptionDetails,
  OptionLogo,
  OptionName,
  PaymentOption,
} from "@/components/OnOffRamp/OnOffRamp.styled";
import { useWertWidget } from "@wert-io/module-react-component";
import type {
  GeneralOptions,
  ReactiveOptions,
} from "@wert-io/module-react-component";

import React, { useEffect, useState } from "react";

interface WertOnRampProps {
  inputValue: string;
  tokenSymbol: string;
  visible: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  setVisible: (value: boolean) => void;
}
export const WertOnRamp: React.FC<WertOnRampProps> = ({
  inputValue,
  setIsDrawerOpen,
  setVisible,
  visible,
  tokenSymbol,
}) => {
  const options: GeneralOptions = {
    partner_id: "01J7WRJB0GN4V22GMTEP1RDGYX",
    origin: "https://sandbox.wert.io",
    extra: {
      wallets: [
        {
          name: "TT",
          network: "amoy",
          address: "0x0118E8e2FCb391bCeb110F62b5B7B963477C1E0d",
        },
        {
          name: "ETH",
          network: "sepolia",
          address: "0x0118E8e2FCb391bCeb110F62b5B7B963477C1E0d",
        },
      ],
    },
  };
  const [reactiveOptions, setReactiveOptions] = useState<ReactiveOptions>({
    theme: "dark",
    listeners: {
      loaded: () => console.log("loaded"),
    },
  });

  const { open: openWertWidget, isWidgetOpen } = useWertWidget(reactiveOptions);

  useEffect(() => {
    if (visible) {
      openWertWidget({ options });
      console.log("Wert widget opened");
      console.log("isWidgetOpen", isWidgetOpen);
    }
  }, [visible, inputValue, tokenSymbol]);
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        {/* <MoonPayBuyWidget
          variant="overlay"
          baseCurrencyCode="usd"
          baseCurrencyAmount={inputValue}
          defaultCurrencyCode={tokenSymbol}
          visible={visible}
        /> */}
      </div>
      <PaymentOption
        onClick={() => {
          setIsDrawerOpen(false);
          setVisible(true);
        }}
      >
        <OptionLogo src="/wert.ico" alt="Wert" />
        <OptionDetails>
          <OptionName>Wert</OptionName>
          <OptionDescription>
            Make Crypto Purchase, Get solana base asset
          </OptionDescription>
        </OptionDetails>
      </PaymentOption>
    </>
  );
};
export default WertOnRamp;
