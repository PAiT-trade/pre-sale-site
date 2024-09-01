import React from "react";
import StyledComponentsRegistry from "./lib/registry";

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};
