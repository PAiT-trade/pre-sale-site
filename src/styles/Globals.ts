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
        width: 100%;
        padding: 0 !important;
    
    }

    .wallet-adapter-button-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 20px !important;
        background-color: transparent;
    }

    .wallet-adapter-dropdown-list {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.primary};
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
        padding: 0.8rem !important;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.text};
        /* border-bottom: 1px solid #f0f0f0; */
    }

    .wallet-adapter-dropdown-list-item:last-child {
        border-bottom: none;
    }

    .veriff-submit {
        width: 100%;
        background-color:#242d44 !important;
        color: white;
        box-sizing: border-box;
        text-transform: capitalize;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.005em;
        display: inline-block;
        text-align: center;
        user-select: none;
        border: 1px solid transparent;
        position: relative;
        height: 40px;
        padding: 0 16px;
        border-radius: 4px;
        transition-property: color, background-color, box-shadow;
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        user-select: none;
        box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0);
    }


    .veriff-description {
        color: #dce1ed !important;
        font-size: 12px;
        line-height: 16px;
        margin: 16px 0;
        text-align: center;
    }
`;
