"use client";
import React, { useEffect } from "react";
import {
  NavbarWrapper,
  NavbarLogoWrapper,
  NavbarLogo,
  NavbarNavWrapper,
  NavbarNavItem,
  NavbarSocialsItem,
  NavbarSocialsWraper,
  NavbarSocialsItemWallet,
} from "./Navbar.styled";
import { WalletButton } from "@/app/solana/solana-provider";
import { MobileMenu } from "./MobileMenu";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import toast from "react-hot-toast";

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = () => {
  // wallet created by user
  // connected to phatom wallet
  const { connected, publicKey, isValidWallet, disconnect } =
    useAnalyzedWallet();

  useEffect(() => {
    if (connected && publicKey) {
      if (isValidWallet) {
        console.log("Connected to wallet", publicKey);
      } else {
        toast.error(
          "This wallet is not valid. It might be a compromised wallet, please use another one"
        );
        disconnect();
      }
    }
  }, [connected, publicKey, isValidWallet]);

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
                {connected && publicKey
                  ? publicKey.slice(0, 6) + "..." + publicKey.slice(-6)
                  : "Connect Wallet"}
              </WalletButton>
            </NavbarSocialsItemWallet>
          </NavbarSocialsItem>
        </NavbarSocialsWraper>
      </NavbarNavWrapper>
    </NavbarWrapper>
  );
};
