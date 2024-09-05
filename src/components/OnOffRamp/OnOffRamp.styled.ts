import { styled } from "styled-components";

export const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  border-bottom: 1px solid rgba(113, 94, 255, 0.5);
  cursor: pointer;

  &:hover {
    background: rgba(113, 94, 255, 0.1);
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const OptionLogo = styled.img`
  width: 56px;
  height: 56px;
  margin-right: 16px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

export const OptionDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OptionName = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const OptionDescription = styled.div`
  color: #bbb;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
