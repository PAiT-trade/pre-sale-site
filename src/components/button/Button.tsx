"use client";
import React from "react";
import {
  IconWrapper,
  Label,
  LabelContainer,
  StyledButton,
  SubLabel,
} from "./Button.styled";

interface ButtonProps {
  label?: string;
  sublabel?: string;
  $variant?: "primary" | "secondary" | "icon" | "connect" | "nav";
  icon?: React.ReactNode;
  onClick?: () => void;
  $padding?: string;
  color?: string;
  $isActive?: boolean;
  $borderRadius?: string;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  label,
  sublabel,
  $variant = "primary",
  icon,
  onClick,
  $padding = "10px 20px",
  color,
  $isActive = false,
  $borderRadius = "20px",
  iconPosition = "left",
}) => {
  return (
    <StyledButton
      $variant={$variant}
      onClick={onClick}
      $padding={$padding}
      color={color}
      $isActive={$isActive}
      $borderRadius={$borderRadius}
    >
      {/* {icon && iconPosition === "left" && (
        <IconWrapper $isActive={$isActive}>{icon}</IconWrapper>
      )} */}
      <LabelContainer>
        {label && <Label>{label}</Label>}
        {sublabel && <SubLabel>{sublabel}</SubLabel>}
      </LabelContainer>
      {/* {icon && iconPosition === "right" && (
        <IconWrapper $isActive={$isActive}>{icon}</IconWrapper>
      )} */}
    </StyledButton>
  );
};
