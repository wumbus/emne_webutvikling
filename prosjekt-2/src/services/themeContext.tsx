import React from "react";

export const themes = {
    light: {    
        background: "repeating-linear-gradient(45deg, #d4d3d371, #eee9e95e 4px, #d4d2d263 4px, #fafafa 25px)",
        textColor: "#000000",
        borderColor: "#000000"
    }, 
    dark: {
        background: "#121212",
        textColor: "#F1F1F1",
        borderColor: "#F1F1F1",
    },
};

export const ThemeContext = React.createContext(themes.dark);
export const ThemeProvider = ThemeContext.Provider;
