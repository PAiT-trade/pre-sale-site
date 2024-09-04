"use client";
import * as React from "react";
import StyledComponentsRegistry from "./lib/registry";
require("@solana/wallet-adapter-react-ui/styles.css");

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};
