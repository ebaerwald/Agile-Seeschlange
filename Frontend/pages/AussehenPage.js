import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Appearance, StyleSheet, Text, View } from "react-native";
import { ThemeChanger } from "../components/ThemeChanger";
import { useTheme } from "../hooks/useTheme";

const AussehenPage = () => {
  const [currentAppColorScheme, setCurrentAppColorScheme] = useState("auto");
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  return (
    <View style={styles.container}>
      <ThemeChanger
        currentAppColorScheme={currentAppColorScheme}
        onChange={setCurrentAppColorScheme}
      />
      <StatusBar style={currentTheme.statusBarStyle} />
    </View>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: currentTheme.textColor,
    },
  });

export { AussehenPage };
