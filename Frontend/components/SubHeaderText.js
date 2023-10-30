import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

const SubHeaderText = ({ title, type }) => {
  const [currentAppColorScheme, setCurrentAppColorScheme] = useState("auto");
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  const getTextAlign = () => {
    switch (type) {
      case "center":
        return "center";
      case "left":
        return "left";
      case "right":
        return "right";
      default:
        return "center"; // Standardwert: zentriert
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.titleText, { textAlign: getTextAlign() }]}>
        {title}
      </Text>
    </View>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    headerContainer: {
      width: "100%",
      marginBottom: 10,
      marginTop: 10,
    },
    titleText: {
      color: currentTheme.textColor,
      fontWeight: "bold",
      fontSize: 16, // Passe die Schriftgröße an, falls erforderlich
    },
  });

export default SubHeaderText;
