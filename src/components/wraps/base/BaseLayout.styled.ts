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

export const NavBarAppWrapper = styled.div`
  margin: 0 auto;
  border-bottom: 1px solid #bec8e01a;

  @media ${devices.mobile} {
    padding: 1rem;
  }
  @media ${devices.tablet} {
    padding: 1rem;
  }
`;
