import React, { useState } from "react";
import { 
    NavigationContainer, 
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
  } from '@react-navigation/native';
import { COLORS } from "./theme";


const lightTheme = {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        background : COLORS.background,
        card : COLORS.card,
        text : COLORS.text,
        border : COLORS.borderColor,
        input : COLORS.input,
        title : COLORS.title,
    },
};

const darkTheme = {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        background : COLORS.darkBackground,
        card : COLORS.darkCard,
        text : COLORS.darkText,
        border : COLORS.darkBorder,
        input : COLORS.darkInput,
        title : COLORS.darkTitle,
    },
};

export interface ThemeContextValue {
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
    setDarkTheme: () => {},
    setLightTheme: () => {},
});

export interface ThemeContextProviderProps {
    children: React.ReactNode;
}

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  
    
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    
    const authContext = React.useMemo(() => ({
      setDarkTheme: () => {
        setIsDarkTheme(true);
      },
      setLightTheme: () => {
        setIsDarkTheme(false);
      }
    }), []);

    const theme = isDarkTheme ? darkTheme : lightTheme; 
  
    return (
        <ThemeContext.Provider value={authContext}>
            <NavigationContainer theme={theme}>
                {children}
            </NavigationContainer>
        </ThemeContext.Provider>
    );
};