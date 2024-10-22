"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ExposureData } from "@/types/wallet_exposure";

interface ConnectWalletContextData {
  connected: boolean;
  publicKey: string | null;
  isValidWallet: boolean;
  exposure: ExposureData | null;
  disconnect: () => void;
  setConnected: (connected: boolean) => void;
}

const ConnectWalletContext = createContext<ConnectWalletContextData | null>(
  null
);

interface AnalyzeConnectWalletProviderProps {
  children: React.ReactNode;
}
const WALLET = "wallet";
const IS_VALID_WALLET = "is_valid_wallet";

export const AnalyzeConnectWalletProvider: React.FC<
  AnalyzeConnectWalletProviderProps
> = ({ children }) => {
  const { connected, publicKey, disconnect } = useWallet();
  const [connectedState, setConnected] = useState(connected);

  const [validWallet, setValidWallet] = useState<boolean>(false);

  const [exposure, setExposure] = useState<ExposureData | null>(null);

  useEffect(() => {
    console.log("Connected:", connected);
    if (publicKey) {
      console.log("Public key:", publicKey.toBase58());

      analyzeWallet(publicKey.toBase58()!)
        .then((res) => {
          console.log("Exposure:", res);
          if (res.status === "success") {
            console.log("Setting in context");
            setValidWallet(true);
            localStorage.setItem(WALLET, publicKey.toBase58()!);
            localStorage.setItem(IS_VALID_WALLET, "true");
            setExposure(res.exposure);
          } else {
            setValidWallet(false);
            setExposure(null);
            localStorage.setItem(WALLET, publicKey.toBase58()!);
            localStorage.setItem(IS_VALID_WALLET, "false");
          }

          console.log("Setting in context", validWallet);
        })
        .catch((error) => {
          console.log("Analyze -> Error:", error);
        });
    }
  }, [connected, publicKey, disconnect, validWallet]);

  const analyzeWallet = async (wallet: string) => {
    try {
      const response = await fetch(`/api/wallet-analyze/${wallet}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Wallet data:", data);

      return data;
    } catch (error) {
      console.log("Error:", error);
      throw new Error("Error fetching data");
    }
  };

  useEffect(() => {
    const isValid = localStorage.getItem(IS_VALID_WALLET);
    if (isValid) {
      setValidWallet(isValid === "true");
    }
  }, []);

  return (
    <ConnectWalletContext.Provider
      value={{
        connected,
        publicKey: publicKey?.toBase58()!,
        disconnect,
        setConnected,
        exposure,
        isValidWallet: validWallet,
      }}
    >
      {children}
    </ConnectWalletContext.Provider>
  );
};

export const useAnalyzedWallet = () => {
  const context = useContext(ConnectWalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
