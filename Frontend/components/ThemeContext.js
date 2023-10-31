import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [currentAppColorScheme, setCurrentAppColorScheme] = useState("auto");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("appColorScheme");
      if (savedTheme) {
        setCurrentAppColorScheme(savedTheme);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      await AsyncStorage.setItem("appColorScheme", currentAppColorScheme);
    };

    saveTheme();
  }, [currentAppColorScheme]);

  return (
    <ThemeContext.Provider
      value={{ currentAppColorScheme, setCurrentAppColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeProvider, useThemeContext };
