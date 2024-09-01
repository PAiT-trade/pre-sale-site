"use client";

import { theme } from "@/app/theme";
import { GlobalStyle } from "@/styles/Globals";
import React from "react";
import { ThemeProvider } from "styled-components";
interface BaseLayoutProps {
  children: React.ReactNode;
}
export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
