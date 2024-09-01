import styled from "styled-components";

export const AdvertWrapper = styled.div`
  background-color: red;
  color: ${({ theme }) => theme.colors.white};
  padding: 4px 4px 4px 30px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AdvertLeftLabel = styled.div`
  font-size: 1.2rem;
`;

export const AdvertContent = styled.div`
  font-size: 1rem;
`;
