import { devices, pixelToViewPortWidth } from "@/utils/common";
import styled from "styled-components";

/**
 * Resuable container
 */
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${pixelToViewPortWidth(32)};
  max-width: 100%;

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

export const Box = styled.div`
  display: flex;
  width: ${pixelToViewPortWidth(320, 320)};
  min-height: ${pixelToViewPortWidth(200, 320)};
  flex-direction: column;
  padding: ${pixelToViewPortWidth(20)};
  margin: ${pixelToViewPortWidth(20)};
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;

  @media (min-width: 768px) {
    width: ${pixelToViewPortWidth(320, 768)};
    min-height: ${pixelToViewPortWidth(200, 768)};
    height: 100%;
  }

  @media (min-width: 1024px) {
    width: ${pixelToViewPortWidth(500)};
    min-height: ${pixelToViewPortWidth(300)};
    height: 100%;
  }
`;

interface FlexProps {
  direction: string;
  justify: string;
  align: string;
  wrap: string;
  gap: string;
  margin: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify }) => justify};
  flex-wrap: ${({ wrap }) => wrap};
  gap: ${({ gap }) => gap};
  margin: ${({ margin }) => margin};

  @media ${devices.mobile} {
    padding: 10px;
    flex-wrap: wrap;
  }
  @media ${devices.tablet} {
    flex-wrap: wrap;
  }

  @media ${devices.desktop} {
    padding: 2.3rem;
  }
`;
export const FlexItem = styled.div`
  width: 100% !important;
  &:not(:last-child) {
    padding-bottom: 2rem;
  }

  @media ${devices.mobile} {
    &:last-child {
      padding-top: 2rem;
    }
  }
  @media ${devices.tablet} {
    &:last-child {
      padding-top: 2rem;
    }
  }

  @media ${devices.desktop} {
  }
`;

interface DotProps {
  bgcolor?: string;
}
export const Dot = styled.div<DotProps>`
  width: 17px;
  background-color: ${({ bgcolor }) => bgcolor || "#4daa90"};
  height: 17px;
  border-radius: 50%;
`;

export const PagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  background-color: #151720 !important;
  margin: 2rem;
  border-radius: 0.4rem;
  gap: 1rem;

  #veriff-root {
    width: 100%;
  }
`;

export const PageWrap = styled.div``;
export const PageTitle = styled.h1``;
