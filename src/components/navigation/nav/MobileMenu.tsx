import React, { useState } from "react";
import styled from "styled-components";
import { AlignRightIcon } from "lucide-react";
import { NavbarMenu } from "./Navbar.styled";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <NavbarMenuButton onClick={toggleDropdown}>
        <AlignRightIcon />
      </NavbarMenuButton>
      <DropdownMenu isOpen={isOpen}>
        <DropdownItem target="_blank" href="https://pait.fi">
          Home
        </DropdownItem>
        <DropdownItem target="_blank" href="https://pait.gitbook.io/pait">
          White Paper
        </DropdownItem>
        <DropdownItem target="_blank" href="#telegram">
          Join Telegram
        </DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
`;

const NavbarMenuButton = styled.div`
  padding: 4px 20px;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  @media (min-width: 768px) {
    display: none;
  }
`;

interface DropdownMenuProps {
  isOpen: boolean;
}

const DropdownMenu = styled.div<DropdownMenuProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  background-color: #191c26;
  min-width: 13rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 2px;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 1.5rem;

  &:hover {
    background-color: #ddd;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #888282;
  }
`;
