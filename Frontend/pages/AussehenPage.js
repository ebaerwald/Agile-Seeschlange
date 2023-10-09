import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../components/ThemeContext";
import { lightModeTheme, darkModeTheme } from "../components/theme";

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
      <Text style={textStyles}>AussehenPage!</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>
          TiefseeModus (Jetzt gerade:{" "}
          {theme === lightModeTheme ? "Oberfläche" : "Tiefsee"})
        </Text>
      </TouchableOpacity>
    </View>
  );
}
