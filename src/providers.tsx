"use client";
import * as React from "react";
import StyledComponentsRegistry from "./lib/registry";
import { LoadingProvider } from "./context/loading-context";
import LoadingOverlay from "./components/LoadingOverlay";
require("@solana/wallet-adapter-react-ui/styles.css");

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <LoadingProvider>
        {children}
        <LoadingOverlay />
      </LoadingProvider>
    </StyledComponentsRegistry>
  );
};
