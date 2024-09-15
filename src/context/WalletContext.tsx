"use client";

import {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { Keypair } from "@solana/web3.js";
import {
  createWallet,
  getWalletPublicKey,
  getWalletPrivateKey,
} from "./../utils/wallet";
import { useWallet as useConnectedWallet } from "@solana/wallet-adapter-react";

interface WalletContextType {
  keypair: Keypair | null;
  publicKey: string | null;
  privateKey: string | null;
  createNewWallet: () => void;
  connectWallet: () => void;
  isWalletConnected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);

  const {
    connected: isWalletConnected,
    connect: connectWallet,
    publicKey: walletPublicKey,
    wallet,
  } = useConnectedWallet();

  const createNewWallet = () => {
    const newKeypair = createWallet();
    setKeypair(newKeypair);
    setPublicKey(getWalletPublicKey(newKeypair));
    setPrivateKey(getWalletPrivateKey(newKeypair));
  };

  useEffect(() => {
    if (isWalletConnected && walletPublicKey) {
      setPublicKey(walletPublicKey.toBase58());
      //   setPrivateKey(wallet?.adapter?..toString("base64"));
    }
  }, [isWalletConnected, walletPublicKey]);

  return (
    <WalletContext.Provider
      value={{
        keypair,
        publicKey,
        privateKey,
        createNewWallet,
        connectWallet,
        isWalletConnected,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
