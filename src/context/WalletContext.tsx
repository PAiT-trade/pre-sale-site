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
import { createWallet } from "./../utils/wallet";
import { useWallet as useConnectedWallet } from "@solana/wallet-adapter-react";

interface WalletContextType {
  keypair: Keypair | null;
  publicKey: string | null;
  privateKey: string | null;
  seedPhrase: string | null;
  setSeedPhrase: (seedPhrase: string) => void;
  createNewWallet: () => void;
  connectWallet: () => void;
  isWalletConnected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);

  const {
    connected: isWalletConnected,
    connect: connectWallet,
    publicKey: walletPublicKey,
    wallet,
  } = useConnectedWallet();

  const createNewWallet = async () => {
    const wallet = await createWallet();
    setKeypair(wallet.keypair);
    setPublicKey(wallet.publicKey);
    setPrivateKey(wallet.privateKey);
    setSeedPhrase(wallet.mnemonic);
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
        seedPhrase,
        setSeedPhrase,
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
