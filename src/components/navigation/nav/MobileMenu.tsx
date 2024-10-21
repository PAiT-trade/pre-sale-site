// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { AlignRightIcon } from "lucide-react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { WalletButton } from "@/app/solana/solana-provider";

// export const MobileMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   // connected to phatom wallet
//   const { connected, publicKey } = useWallet();
//   useEffect(() => {
//     if (connected && publicKey) {
//     }
//   }, [connected, publicKey]);

//   return (
//     <DropdownContainer>
//       <NavbarMenuButton onClick={toggleDropdown}>
//         <AlignRightIcon />
//       </NavbarMenuButton>
//       <DropdownMenu isOpen={isOpen}>
//         <DropdownItem target="_blank" href="https://pait.fi">
//           Home
//         </DropdownItem>
//         <DropdownItem target="_blank" href="https://pait.gitbook.io/pait">
//           White Paper
//         </DropdownItem>
//         <DropdownItem target="_blank" href="#telegram">
//           Join Telegram
//         </DropdownItem>
//         <DropdownItemDiv>
//           <WalletButton>
//             {connected && publicKey
//               ? publicKey?.toBase58().slice(0, 6) +
//                 "..." +
//                 publicKey?.toBase58().slice(-6)
//               : "Connect"}
//           </WalletButton>
//         </DropdownItemDiv>
//       </DropdownMenu>
//     </DropdownContainer>
//   );
// };

// const DropdownContainer = styled.div`
//   position: relative;
// `;

// const NavbarMenuButton = styled.div`
//   padding: 4px 20px;
//   font-size: 1.5rem;
//   border: none;
//   cursor: pointer;
//   border-radius: 5px;
//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// interface DropdownMenuProps {
//   isOpen: boolean;
// }

// const DropdownMenu = styled.div<DropdownMenuProps>`
//   display: ${({ isOpen }) => (isOpen ? "block" : "none")};
//   position: absolute;
//   background-color: #191c26;
//   min-width: 13rem;
//   box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
//   z-index: 1;
//   border-radius: 2px;
// `;

// const DropdownItem = styled.a`
//   color: black;
//   padding: 12px 16px;
//   text-decoration: none;
//   display: block;
//   font-size: 1.5rem;

//   &:hover {
//     background-color: #ddd;
//   }
//   &:not(:last-child) {
//     border-bottom: 1px solid #888282;
//   }
// `;

// const DropdownItemDiv = styled.div`
//   color: black;
//   padding: 12px 16px;
//   text-decoration: none;
//   display: block;
//   font-size: 1.5rem;

//   &:hover {
//     background-color: #ddd;
//   }
//   &:not(:last-child) {
//     border-bottom: 1px solid #888282;
//   }
// `;

import { AlignRightIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/app/solana/solana-provider";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connected, publicKey } = useWallet();
  useEffect(() => {
    if (connected && publicKey) {
    }
  }, [connected, publicKey]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <AlignRightIcon />
      </DropdownButton>
      <DropdownMenu isopen={isOpen.toString()}>
        <DropdownItem href="https://pait.fi" target="_blank">
          Home
        </DropdownItem>
        <DropdownItem href="https://pait.gitbook.io/pait" target="_blank">
          White Paper
        </DropdownItem>
        <DropdownItem href="#telegram">Join Telegram</DropdownItem>
        <DropdownItemDiv>
          <WalletButton>
            {connected && publicKey
              ? publicKey?.toBase58().slice(0, 6) +
                "..." +
                publicKey?.toBase58().slice(-6)
              : "Connect"}
          </WalletButton>
        </DropdownItemDiv>
      </DropdownMenu>
    </DropdownContainer>
  );
};

// Styled Components
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  @media (min-width: 768px) {
    display: none; // Hide on larger screens
  }
`;

interface DropdownMenuProps {
  isopen: string;
}

const DropdownMenu = styled.div<DropdownMenuProps>`
  display: ${({ isopen }) => (isopen === "true" ? "block" : "none")};
  position: absolute;
  background-color: #191c26;
  min-width: 16rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 2px;
  right: 0;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 1.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid #888282;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const DropdownItemDiv = styled.div`
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
