"use client";

import { theme } from "@/app/theme";
import { Advert } from "@/components/navigation/ads/Advert";
import { Navbar } from "@/components/navigation/nav/Navbar";
import { GlobalStyle } from "@/styles/Globals";
import React from "react";
import { ThemeProvider } from "styled-components";
import { AppWrapper } from "./BaseLayout.styled";
import { Toaster } from "react-hot-toast";

interface BaseLayoutProps {
  children: React.ReactNode;
}
export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {/* <Advert /> */}
      <AppWrapper>
        <Navbar />
        {children}
      </AppWrapper>
      <Toaster />
    </ThemeProvider>
  );
};
