import styled, { keyframes } from "styled-components";

const scrollLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const AdvertWrapper = styled.div`
  background-color: #5f30a0;
  color: ${({ theme }) => theme.colors.white};
  padding: 4px 4px 4px 30px;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
`;

export const AdvertLeftLabel = styled.div`
  font-size: 1.2rem;
  z-index: 2;
  position: relative;
`;

export const AdvertContent = styled.ul`
  font-size: 1rem;
  white-space: nowrap;
  display: inline-block;
  animation: ${scrollLeft} 10s linear infinite;
  position: relative;
  z-index: 1;
`;

export const AdvertContentItem = styled.li`
  display: inline-block;
  padding: 0 1rem;
`;
