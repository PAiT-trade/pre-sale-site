"use client";

import { theme } from "@/app/theme";
import { Advert } from "@/components/navigation/ads/Advert";
import { Navbar } from "@/components/navigation/nav/Navbar";
import { GlobalStyle } from "@/styles/Globals";
import React from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "./BaseLayout.styled";
interface BaseLayoutProps {
  children: React.ReactNode;
}
export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {/* <Advert /> */}
      <Container>
        <Navbar />
        {children}
      </Container>
    </ThemeProvider>
  );
};
