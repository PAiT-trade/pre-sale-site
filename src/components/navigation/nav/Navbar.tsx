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
} from "./Navbar.styled";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <NavbarWrapper>
      <NavbarLogoWrapper href="/">
        <NavbarLogo src="https://cdn.prod.website-files.com/6645e7046629ba71066f47ff/66564c89e5896a4f1953b083_PAIT_White%20Logo%201.svg" />
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
        <NavbarSocialsItem suppressHydrationWarning>
          <WalletMultiButton />
        </NavbarSocialsItem>
      </NavbarSocialsWraper>
    </NavbarWrapper>
  );
};
