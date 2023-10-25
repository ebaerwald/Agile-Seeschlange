import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "../components/ThemeContext";
import { lightModeTheme, darkModeTheme } from "../components/theme";
import SnakeImage from "../components/SnakeImage";

export function AussehenPage() {
  const { theme, toggleTheme } = useTheme();

  const pageStyles = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.background,
  };

  const textStyles = {
    color: theme.text,
  };

  return (
    <View style={pageStyles}>
      <SnakeImage></SnakeImage>
      <Text style={textStyles}>AussehenPage!</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={textStyles}>TiefseeModus: </Text>
        <Switch value={theme === darkModeTheme} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}
