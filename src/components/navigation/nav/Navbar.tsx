"use client";
import React, { useEffect } from "react";
import {
  NavbarWrapper,
  NavbarLogoWrapper,
  NavbarLogo,
  NavbarNavWrapper,
  NavbarLogoCircle,
  NavbarLogoCircleRight,
  NavbarNavItem,
  NavbarSocialsItem,
  NavbarSocialsWraper,
  NavbarSocialsItemWallet,
} from "./Navbar.styled";
import { WalletButton } from "@/app/solana/solana-provider";
import { useWallet } from "@/context/WalletContext";
import { useWallet as useConnectWallet } from "@solana/wallet-adapter-react";

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = () => {
  // wallet created by user
  const { publicKey, connectWallet, isWalletConnected } = useWallet();
  // connected to phatom wallet
  const { connected, publicKey: phantomPublicKey } = useConnectWallet();

  useEffect(() => {
    if (connected && phantomPublicKey) {
      connectWallet();
    }
  }, [connected, phantomPublicKey, connectWallet]);

  return (
    <NavbarWrapper>
      <NavbarLogoWrapper href="/">
        <NavbarLogo src="/Logo.svg" />
        {/* <NavbarLogoCircle />
        <NavbarLogoCircleRight /> */}
      </NavbarLogoWrapper>
      <NavbarNavWrapper>
        {/* <NavbarNavItem>Home</NavbarNavItem>
        <NavbarNavItem>Tokenomics</NavbarNavItem>
        <NavbarNavItem>Whitepaper</NavbarNavItem>
        <NavbarNavItem>Team</NavbarNavItem>
        <NavbarNavItem>FAQ</NavbarNavItem> */}
      </NavbarNavWrapper>
      <NavbarSocialsWraper>
        <NavbarSocialsItem>
          <NavbarSocialsItemWallet suppressHydrationWarning>
            {publicKey && (
              <div>
                {<>{publicKey?.slice(0, 6) + "..." + publicKey?.slice(-6)}</>}
              </div>
            )}
            {!publicKey && (
              <WalletButton>
                {connected && phantomPublicKey && !isWalletConnected
                  ? phantomPublicKey?.toBase58().slice(0, 6) +
                    "..." +
                    phantomPublicKey?.toBase58().slice(-6)
                  : "Connect Wallet"}
              </WalletButton>
            )}
          </NavbarSocialsItemWallet>
        </NavbarSocialsItem>
      </NavbarSocialsWraper>
    </NavbarWrapper>
  );
};
