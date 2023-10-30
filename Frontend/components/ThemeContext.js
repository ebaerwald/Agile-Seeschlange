import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [currentAppColorScheme, setCurrentAppColorScheme] = useState('auto');

  return (
    <ThemeContext.Provider value={{ currentAppColorScheme, setCurrentAppColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
