import React, { useEffect } from "react";
import {
  OptionDescription,
  OptionDetails,
  OptionLogo,
  OptionName,
  PaymentOption,
} from "@/components/OnOffRamp/OnOffRamp.styled";
import { TransakConfig, Transak } from "@transak/transak-sdk";

interface TransakOnOffRampProps {
  apiKey: string;
  environment: "staging" | "production";
  setIsDrawerOpen: (value: boolean) => void;
  setVisible: (value: boolean) => void;
  visible: boolean;
  amount: number;
}

const TransakOnOffRamp: React.FC<TransakOnOffRampProps> = ({
  apiKey,
  environment,
  setIsDrawerOpen,
  setVisible,
  visible,
  amount,
}) => {
  useEffect(() => {
    let transak: Transak | null = null;

    if (visible) {
      const transakConfig: TransakConfig = {
        apiKey,
        environment:
          environment === "staging"
            ? Transak.ENVIRONMENTS.STAGING
            : Transak.ENVIRONMENTS.PRODUCTION,
        cryptoAmount: amount,
        defaultCryptoCurrency: "SOL",
        defaultFiatAmount: 100,
        defaultFiatCurrency: "USD",
      };

      transak = new Transak(transakConfig);

      transak.init();

      Transak.on("*", (data) => {
        console.log(data);
      });

      Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
        console.log("Transak SDK closed!");
        setVisible(false);
      });

      Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
        console.log(orderData);
      });

      Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        console.log(orderData);
        transak?.close();
      });
    }
    return () => {
      transak?.close();
    };
  }, [apiKey, environment, visible, amount, setVisible]);

  return (
    <div>
      <div className="flex flex-col items-center space-y-4">
        {visible && <div id="transak-widget-container"></div>}
      </div>
      <PaymentOption
        onClick={() => {
          setIsDrawerOpen(false);
          setVisible(true);
        }}
      >
        <OptionLogo src="/transak.png" alt="Transak" />
        <OptionDetails>
          <OptionName>Transak</OptionName>
          <OptionDescription>
            75+ blockchains via cards, bank transfers in 168 countries.
          </OptionDescription>
        </OptionDetails>
      </PaymentOption>
    </div>
  );
};

export default TransakOnOffRamp;
