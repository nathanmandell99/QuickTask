import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

type Theme = {
  colors: {
    background: string;
    text: string;
    checkbox: string;
  }
};

const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    checkbox: '#000000',
  }
};

const darkTheme: Theme = {
  colors: {
    background: '#25292e',
    text: '#ffffff',
    checkbox: '#ffffff',
  }
};

const ThemeContext = createContext<Theme>(lightTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 