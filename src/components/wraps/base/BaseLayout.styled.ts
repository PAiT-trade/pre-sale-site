import { devices } from "@/utils/common";
import styled from "styled-components";

export const AppWrapper = styled.div`
  max-width: 77.5rem;
  margin: 0 auto;
  height: 100vh;

  @media ${devices.mobile} {
    padding: 1rem;
  }
  @media ${devices.tablet} {
    padding: 1rem;
  }
`;
