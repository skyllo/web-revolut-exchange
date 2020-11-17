import React, { createContext, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
import { CustomTheme, darkTheme, lightTheme, styled } from './Theme';

const GlobalStyle = createGlobalStyle<{ theme: CustomTheme }>`
  html, body, #root {
    height: 100%;
  }

  body {
    position: relative;
    margin: 0;
    font-family: 'Roboto', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  h1 {
    font-weight: ${({ theme }) => theme.fonts.fontWeightMedium};
    font-size: ${({ theme }) => theme.fonts.fontSizeExtraLarge};
  }
`;

export type ThemeContextType = {
  theme: CustomTheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => console.warn('toggleTheme() needs to be implemented.'),
});

export const ThemeWrapperStyle = styled.div`
  height: 100vh;
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<CustomTheme>(lightTheme);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
