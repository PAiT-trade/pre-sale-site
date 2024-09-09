import { pixelToViewPortWidth } from "@/utils/common";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
    }
    :root {
        font-size: ${pixelToViewPortWidth(24)};

        @media (min-width: 768px) {
            font-size: ${pixelToViewPortWidth(18)};
        }

        @media (min-width: 1024px) {
            font-size: ${pixelToViewPortWidth(16)};
        }
    }

    body {
        font-family: ${({ theme }) => theme.fonts.main};
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
        font-size: 87.5%;
        height: 100vh;
        line-height: 1.5;
    }
    
    img  {
        max-width: 100%;
    }

    .wallet-adapter-dropdown {
        width: 100% !important;
    
    }
    .wallet-adapter-button {
    width: 100% !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 5.2rem;
    width: 100%;
    padding: 0 !important;
    &:hover, &:active {
        padding: 10px !important;
    }
    
    }

    .wallet-adapter-button-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: transparent;
    }

    .wallet-adapter-dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    list-style: none;
    padding: 0;
    margin: 0;
    }

    .wallet-adapter-modal-list {
        li {
            padding: 10px !important;
        }
    }

    .wallet-adapter-dropdown-list-item {
    padding: 10px !important;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    }

    .wallet-adapter-dropdown-list-item:last-child {
    border-bottom: none;
    }
`;
