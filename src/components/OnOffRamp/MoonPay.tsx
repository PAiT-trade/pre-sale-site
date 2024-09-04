import {
  OptionDescription,
  OptionDetails,
  OptionLogo,
  OptionName,
  PaymentOption,
} from "@/components/OnOffRamp/OnOffRamp.styled";
import dynamic from "next/dynamic";
import React from "react";

interface MoonPayOnRampProps {
  inputValue: string;
  tokenSymbol: string;
  visible: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  setVisible: (value: boolean) => void;
}

// Dynamically import the MoonPayProvider component with no SSR
const MoonPayProvider = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayProvider),
  { ssr: false }
);

// Dynamically import the MoonPayBuyWidget component with no SSR
const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);

export const MoonPayOnRamp: React.FC<MoonPayOnRampProps> = ({
  inputValue,
  setIsDrawerOpen,
  setVisible,
  visible,
  tokenSymbol,
}) => {
  return (
    <MoonPayProvider apiKey="pk_test_7Ycbc7J9gLs10CFBJA8MMxn0YxgRjh1e">
      <div className="flex flex-col items-center space-y-4">
        <MoonPayBuyWidget
          variant="overlay"
          baseCurrencyCode="usd"
          baseCurrencyAmount={inputValue}
          defaultCurrencyCode={tokenSymbol}
          visible={visible}
        />
      </div>
      <PaymentOption
        onClick={() => {
          setIsDrawerOpen(false);
          setVisible(true);
        }}
      >
        <OptionLogo src="/moonpay.png" alt="Moonpay" />
        <OptionDetails>
          <OptionName>Moonpay</OptionName>
          <OptionDescription>
            Buy with your card, sell in a snap.
          </OptionDescription>
        </OptionDetails>
      </PaymentOption>
    </MoonPayProvider>
  );
};
export default MoonPayOnRamp;
