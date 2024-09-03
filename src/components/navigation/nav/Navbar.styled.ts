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
  top: 1.45rem;
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
export const NavbarNavWrapper = styled.ul`
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
`;
export const NavbarNavItem = styled.li`
  align-self: stretch;
  color: #fff;
  cursor: pointer;
`;
export const NavbarSocialsWraper = styled.div``;
export const NavbarSocialsItem = styled.div``;
