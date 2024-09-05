import styled, { css } from "styled-components";

export const primaryStyle = css`
  background-color: #306c6d;
  color: white;
  border: 2px solid transparent;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  &:hover {
    background-color: #4744aa;
    color: white;
  }

  &:focus {
    border-color: #000;
  }
`;

export const secondaryStyle = css`
  background: rgba(77, 71, 122, 0.25);
  color: #fefefe;
  border: 0.5px solid rgba(186, 182, 249, 0.25);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  &:hover {
    background-color: #4744aa;
    color: white;
    border: none;
  }

  &:focus {
    border-color: #555;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const iconStyle = css`
  background-color: #333;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #555;
  }

  &:focus {
    border-color: #777;
  }
`;

export const connectStyle = css`
  background-color: transparent;
  color: white;
  border: 1px solid white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    border-color: #fff;
  }
`;

export const navStyle = css<{ $isActive: boolean }>`
  background: ${({ $isActive }) =>
    $isActive ? "#4744aa" : "rgba(255, 255, 255, 0.10)"};
  border: 0.5px solid #bab6f9;
  border-radius: 13px;
  color: white;
  flex-direction: column;
  align-items: center;
  display: flex;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 0 5px;
  padding: 10px;
  &:hover {
    background: #4744aa;
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  svg {
    fill: ${({ $isActive }) => ($isActive ? "#fff" : "currentColor")};
    transition: fill 0.3s;
  }
  @media screen and (max-width: 368px) {
    padding: 5px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px 15px;
  }
`;

export const StyledButton = styled.button<{
  $variant: string;
  $padding: string;
  color?: string;
  $isActive: boolean;
  $borderRadius: string;
}>`
  font-size: 16px;
  padding: ${({ $padding }) => $padding};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  background-color: ${{}};
  color: ${({ color }) => color || "inherit"};
  display: flex;
  align-items: center;

  ${({ $variant }) => $variant === "primary" && primaryStyle}
  ${({ $variant }) => $variant === "secondary" && secondaryStyle}
  ${({ $variant }) => $variant === "icon" && iconStyle}
  ${({ $variant }) => $variant === "connect" && connectStyle}
  ${({ $variant }) => $variant === "nav" && navStyle}
`;

export const IconWrapper = styled.span<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  fill: ${({ $isActive }) => ($isActive ? "#fff" : "currentColor")};
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.span`
  margin-left: 5px;
`;

export const SubLabel = styled.span`
  color: #f7f7f7;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 5px;
`;
