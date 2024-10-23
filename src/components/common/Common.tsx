"use client";
import React from "react";
import { Flex } from "./Common.styled";
import styled from "styled-components";

interface CommonProps {
  children: React.ReactNode;
  direction: "row" | "column";
  justify:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
  align: "center" | "flex-start" | "flex-end";
  wrap: "wrap" | "nowrap";
  gap: string;
  margin: string;
}
export const FlexBox: React.FC<CommonProps> = ({
  children,
  direction,
  justify,
  align,
  wrap,
  gap,
  margin,
}) => {
  return (
    <Flex
      direction={direction}
      justify={justify}
      align={align}
      wrap={wrap}
      gap={gap}
      margin={margin}
    >
      {children}
    </Flex>
  );
};

export const ConnectWalletButtonExtends = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
  z-index: 100;
  & > div {
    width: 100% !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem !important;
    border-radius: 6px;
    border: 1px solid #5cdfd8;

    &:hover,
    &:active {
      /* padding: 0.8rem !important; */
    }

    & > .wallet-adapter-button {
      color: #a6fff3;
    }
  }
`;
