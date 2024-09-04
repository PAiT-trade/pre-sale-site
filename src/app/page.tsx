"use client";
import { useState } from "react";
import MoonPayOnRamp from "@/components/OnOffRamp/MoonPay";
import TransakOnOffRamp from "@/components/OnOffRamp/TransakOnOffRamp";
export default function Home() {
  const [isMoonPayEnabled, setIsMoonPayEnabled] = useState<boolean>(false);
  const [isTransakEnabled, setIsTransakEnabled] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>("");
  const [equivalentValue, setEquivalentValue] = useState<number>(0);
  const [isDollarInput, setIsDollarInput] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const tokenSymbol = "SOL";

  return (
    <main>
      <h1>PAiT Pre-sale</h1>
      <p>Pre-sale of PAiT Tokens</p>

      <MoonPayOnRamp
        inputValue={inputValue}
        setIsDrawerOpen={setIsDrawerOpen}
        setVisible={setIsMoonPayEnabled}
        visible={isMoonPayEnabled}
        tokenSymbol={tokenSymbol}
      />

      <TransakOnOffRamp
        apiKey="e6e15239-cae2-4d5d-bb8d-8f98346c576c"
        setIsDrawerOpen={setIsDrawerOpen}
        environment="staging"
        setVisible={setIsTransakEnabled}
        visible={isTransakEnabled}
        amount={Number(inputValue ? inputValue : "0")}
      />
    </main>
  );
}
