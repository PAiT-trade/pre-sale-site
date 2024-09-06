import styled from "styled-components";

export const BuyCardContainer = styled.div`
  top: 0;
  background-color: #141824;
  width: 30rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BuyCardHeader = styled.div`
  padding: 1.6rem;
`;
export const BuyCardHeaderTitle = styled.h1`
  color: #7c8cae;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.5;
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
  background-color: #333e59;
  padding: 0.3rem;
  border-radius: 0.5rem;
  cursor: crosshair;
`;

interface BuyCardActionButtonProps {
  method?: string;
}
export const BuyCardActionButton = styled.button<BuyCardActionButtonProps>`
  cursor: pointer;
  display: flex;
  z-index: 999;
  gap: 0.5rem;
  justify-content: center;
  background-color: ${({ method }) =>
    method == "card" ? "#141824" : "#2e364e"};
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: #fff;
  border: none;
  outline-width: 0;
  width: 100%;
  font-size: 14px;
`;
export const BuyCardActionButtonIcon = styled.div``;
export const BuyCardActionButtonText = styled.p``;
