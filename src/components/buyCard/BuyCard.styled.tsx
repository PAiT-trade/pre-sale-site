import { devices } from "@/utils/common";
import styled from "styled-components";

export const BuyCardContainer = styled.div`
  top: 0;
  background-color: #141824;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;

  @media ${devices.mobile} {
  }

  @media ${devices.tablet} {
  }

  @media ${devices.desktop} {
    width: 23.625rem;
    /* margin: 2.3rem; */
  }
`;

export const BuyCardHeader = styled.div`
  padding: 1.6rem;
`;
export const BuyCardHeaderTitle = styled.h1`
  color: #7c8cae;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.5;

  @media ${devices.mobile} {
    font-size: 2.6rem;
  }
  @media ${devices.tablet} {
    font-size: 2.6rem;
  }
`;
export const BuyCardHeaderSubTitle = styled.h4`
  color: #7c8cae;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  padding-bottom: 1rem;
`;
export const BuyCardHeaderAllocationWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: column;
`;
export const BuyCardHeaderAllocationHeader = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
`;
export const BuyCardHeaderAllocationLabel = styled.div``;
export const BuyCardHeaderAllocationValue = styled.span``;
export const BuyCardHeaderAllocationProgressBar = styled.div``;

interface BuyCardsTextProps {
  color?: string;
}
export const BuyCardsText = styled.div<BuyCardsTextProps>`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  color: ${({ color }) => (color ? color : "#7c8cae")};
`;

export const BoughtCardTitle = styled.h2``;
export const BoughtCardSubTitle = styled.h3`
  color: #7c8cae;
  font-size: 14px;
`;

export const BoughCard = styled.div`
  border-bottom: 1px solid #7c8cae;
  padding: 1.6rem;
  background-color: #141824;

  & > div > * {
    display: flex;
    justify-content: start;
    text-align: left;
    align-items: center;
    flex-direction: column;
  }
`;

export const BuyCardActionWrapper = styled.div`
  padding: 1.6rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

export const BuyCardActionButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #3a4662;
  padding: 0.3rem;
  border-radius: 0.5rem;
  cursor: crosshair;
`;

interface BuyCardActionButtonProps {
  bgcolor?: string;
}
export const BuyCardActionButton = styled.button<BuyCardActionButtonProps>`
  cursor: pointer;
  display: flex;
  z-index: 999;
  gap: 0.5rem;
  justify-content: center;
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : "#2e364e")};
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: #fff;
  border: none;
  outline-width: 0;
  width: 100%;
  font-size: 14px;
`;
export const BuyCardActionButtonIcon = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;
export const BuyCardActionButtonText = styled.p``;

export const BuyCardControlGroup = styled.div`
  border: 1px solid #7c8cae;
  width: 100%;
  padding: 1.6rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3rem;
`;

export const BuyCardInputs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const BuyCardControlInputGroup = styled.div`
  display: flex;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;
export const BuyCardActions = styled.div``;
export const BuyCardControlInputLabelGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px !important;
`;
export const BuyCardControlInputLabelLeft = styled.label`
  color: #7c8cae;
`;
export const BuyCardControlInputLabelRight = styled.span`
  color: #5cdfd8;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
`;
export const BuyCardControlInputControl = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  height: 32px;
  width: 100%;
  background-color: #333e59;
  padding: 0.5rem;
  border-radius: 6px;
`;
export const BuyCardControlInput = styled.input`
  border: none;
  background: none;
  outline-width: 0;
  color: #fff;
  border-radius: 0.5rem;
  width: 100%;
`;

export const BuyCardControlButton = styled.button`
  z-index: 999;
  color: #e0e5f0;
  border: none;
  outline-width: 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  height: 31px;
  background-color: #27334e;
  &:hover,
  &:active {
    background-color: #27334e;
  }
`;

export const DontHaveWallet = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: underline;
  color: #7c8cae;
  @media ${devices.mobile} {
    font-size: 1.5rem;
  }
  @media ${devices.tablet} {
    font-size: 1.5rem;
  }
`;
