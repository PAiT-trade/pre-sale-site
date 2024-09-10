import React from "react";
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
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletButton } from "@/app/solana/solana-provider";
import { useWallet } from "@solana/wallet-adapter-react";

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = () => {
  const { connected, publicKey } = useWallet();
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
            <WalletButton>
              {" "}
              {connected
                ? publicKey?.toBase58().slice(0, 6) +
                  "..." +
                  publicKey?.toBase58().slice(-6)
                : "Connect Wallet"}
            </WalletButton>
          </NavbarSocialsItemWallet>
        </NavbarSocialsItem>
      </NavbarSocialsWraper>
    </NavbarWrapper>
  );
};
