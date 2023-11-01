import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";

const Background = ({ children }) => {
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  return <View style={styles.backgroundContainer}>{children}</View>;
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
      padding: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  });

export default Background;
