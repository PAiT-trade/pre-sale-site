"use client";
import * as React from "react";
import StyledComponentsRegistry from "./lib/registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "./wagmi";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
