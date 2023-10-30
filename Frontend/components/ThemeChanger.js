import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";


const ThemeChanger = ({ currentAppColorScheme, onChange }) => {
  const currentTheme = useTheme({ currentAppColorScheme });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onChange("light");
        }}
        style={[
          styles.appearance,
          styles.light,
          { borderColor: currentTheme.borderColor },
          currentAppColorScheme === "light" ? styles.active : styles.inactive,
        ]}
      >
        <Text style={[styles.text, { color: currentTheme.textColor }]}>
          Oberfläche
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onChange("auto");
        }}
        style={[
          styles.appearance,
          styles.auto,
          { borderColor: currentTheme.borderColor },
          currentAppColorScheme === "auto" ? styles.active : styles.inactive,
        ]}
      >
        <Text style={[styles.text, { color: currentTheme.textColor }]}>
          Auto
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onChange("dark");
        }}
        style={[
          styles.appearance,
          styles.dark,
          { borderColor: currentTheme.borderColor },
          currentAppColorScheme === "dark" ? styles.active : styles.inactive,
        ]}
      >
        <Text style={[styles.text, { color: currentTheme.textColor }]}>
          Tiefsee
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 46,
    margin: 15,
    borderRadius: 10,
    flexDirection: "row",
  },
  appearance: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  light: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0.5,
  },
  auto: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  dark: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 0.5,
  },
  active: {
    borderWidth: 3,
  },
  inactive: {
    borderWidth: 0.5,
  },
  text: {
    fontSize: 18,
  },
});

export { ThemeChanger };