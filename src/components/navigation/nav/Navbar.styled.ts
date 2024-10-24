import { devices } from "@/utils/common";
import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 77.5rem;
  margin: 0 auto;
`;
export const NavbarLogoWrapper = styled.a``;
export const NavbarLogo = styled.img``;
export const NavbarLogoCircle = styled.div`
  z-index: 1;
  background-color: #fff;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  position: absolute;
  top: 1.6rem;
  left: 3.35rem;
  right: auto;
  padding-right: 0.2rem;
  transform: translate3d(0px, 0px, 0px) scale(0.256, 0.256, 0.256) rotateX(0deg)
    rotateY(0deg) rotateZ(0deg) skewX(0deg) skewY(0deg);
  transform-style: preserve-3d;
  will-change: transform;
  animation: ${blink} 1.4s infinite;
`;

export const NavbarLogoCircleRight = styled(NavbarLogoCircle)`
  left: 2.55rem;
`;
export const NavbarNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  font-family: "Poppins", sans-serif;
  gap: 2rem;

  @media ${devices.mobile} {
    display: none;
  }
`;

export const NavbarMenu = styled.div`
  display: none;
`;
export const NavbarNavItem = styled.a`
  align-self: stretch;
  color: #fff;
  cursor: pointer;
`;
export const NavbarSocialsWraper = styled.div``;
export const NavbarSocialsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 20px;
`;
export const NavbarSocialsItemWallet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  & > div {
    width: 100% !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem !important;
    border-radius: 6px;
    border: 1px solid #5cdfd8;

    &:hover,
    &:active {
      /* padding: 0.8rem !important; */
    }

    & > .wallet-adapter-button {
      color: #a6fff3;
    }
  }
`;
