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
  NavbarMenu,
} from "./Navbar.styled";
import { WalletButton } from "@/app/solana/solana-provider";
import { useWallet } from "@/context/WalletContext";
import { useWallet as useConnectWallet } from "@solana/wallet-adapter-react";
import { AlignRightIcon } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

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

      <MobileMenu />
      <NavbarNavWrapper>
        <NavbarNavItem href={`https://pait.fi`}>Home</NavbarNavItem>
        <NavbarNavItem href={`https://pait.gitbook.io/pait`}>
          Whitepaper
        </NavbarNavItem>
        <NavbarNavItem href="#">Join Telegram</NavbarNavItem>
        <NavbarSocialsWraper>
          <NavbarSocialsItem>
            <NavbarSocialsItemWallet suppressHydrationWarning>
              <WalletButton>
                {connected && phantomPublicKey
                  ? phantomPublicKey?.toBase58().slice(0, 6) +
                    "..." +
                    phantomPublicKey?.toBase58().slice(-6)
                  : "Connect Wallet"}
              </WalletButton>
            </NavbarSocialsItemWallet>
          </NavbarSocialsItem>
        </NavbarSocialsWraper>
      </NavbarNavWrapper>
    </NavbarWrapper>
  );
};
