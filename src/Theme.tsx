import baseStyled, { DefaultTheme, ThemedStyledInterface } from 'styled-components/macro';

// types
interface Fonts {
  // weights
  fontWeightThin: number;
  fontWeightNormal: number;
  fontWeightMedium: number;
  fontWeightSemibold: number;
  fontWeightBold: number;
  fontWeightExtrabold: number;
  fontWeightBlack: number;
  // sizes
  fontSizeSmall: string;
  fontSizeMedium: string;
  fontSizeLarge: string;
  fontSizeExtraLarge: string;
  fontSizeHuge: string;
}

interface Colors {
  backgroundColor: string;
  foregroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  light1Color: string;
  light2Color: string;
  errorColor: string;
}

export interface CustomTheme extends DefaultTheme {
  colors: Colors;
  fonts: Fonts;
}

// values
const fonts: Fonts = {
  fontWeightThin: 300,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,
  fontWeightExtrabold: 800,
  fontWeightBlack: 900,
  fontSizeSmall: '0.6em',
  fontSizeMedium: '0.9em',
  fontSizeLarge: '1em',
  fontSizeExtraLarge: '1.5em',
  fontSizeHuge: '2em',
};

export const lightTheme: CustomTheme = {
  colors: {
    backgroundColor: 'white',
    foregroundColor: 'black',
    primaryColor: '#156AE7',
    secondaryColor: '#F3F4F5',
    light1Color: '#CED5DB',
    light2Color: '#8C8C8C',
    errorColor: '#E859A5',
  },
  fonts,
};

export const darkTheme: CustomTheme = {
  colors: {
    backgroundColor: 'black',
    foregroundColor: 'white',
    primaryColor: '#156AE7',
    secondaryColor: '#1C1C1E',
    light1Color: '#4E4E50',
    light2Color: '#87878E',
    errorColor: '#E859A5',
  },
  fonts,
};

export const styled = baseStyled as ThemedStyledInterface<CustomTheme>;
