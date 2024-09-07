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
`;
