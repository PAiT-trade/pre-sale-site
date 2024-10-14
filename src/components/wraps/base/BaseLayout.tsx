"use client";

import { theme } from "@/app/theme";
import { Advert } from "@/components/navigation/ads/Advert";
import { Navbar } from "@/components/navigation/nav/Navbar";
import { GlobalStyle } from "@/styles/Globals";
import React from "react";
import { ThemeProvider } from "styled-components";
import { AppWrapper, NavBarAppWrapper } from "./BaseLayout.styled";
import { Toaster, ToastBar } from "react-hot-toast";

interface BaseLayoutProps {
  children: React.ReactNode;
}
export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* <Advert /> */}
      <NavBarAppWrapper>
        <Navbar />
      </NavBarAppWrapper>
      <AppWrapper>{children}</AppWrapper>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? "custom-enter 1s ease"
                : "custom-exit 1s ease",
            }}
          />
        )}
      </Toaster>
      ;
    </ThemeProvider>
  );
};
