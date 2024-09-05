import styled from "styled-components";

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
  align-items: ${({ align }) => align};
  flex-wrap: ${({ wrap }) => wrap};
  gap: ${({ gap }) => gap};
  margin: ${({ margin }) => margin};
`;
export const FlexItem = styled.div``;
export const Container = styled.div``;
