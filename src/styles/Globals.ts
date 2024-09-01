import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        text-decoration: none;
    }

    body {
        font-family: ${({ theme }) => theme.fonts.main};
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
        font-size: ${({ theme }) => theme.fontSizes.medium};
    }
    
    img  {
        max-width: 100%;
    }
`;
