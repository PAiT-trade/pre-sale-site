import React from "react";
import { Flex } from "./Common.styled";

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
