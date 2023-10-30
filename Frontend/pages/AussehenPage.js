import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Switch } from "react-native"; // Add Switch
import { ThemeChanger } from "../components/ThemeChanger";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";

const AussehenPage = () => {
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext(); // Call useThemeContext as a function
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  const [tiefseeActive, setTiefseeActive] = useState(
    currentAppColorScheme === "dark"
  );
  const [automatischActive, setAutomatischActive] = useState(
    currentAppColorScheme === "auto"
  );
  const [oberflacheActive, setOberflacheActive] = useState(
    currentAppColorScheme === "light"
  );

  const handleTiefseeChange = (value) => {
    if (value) {
      setCurrentAppColorScheme("dark"); // Set the app theme to dark
    }
  };

  const handleAutomatischChange = (value) => {
    if (value) {
      setCurrentAppColorScheme("auto"); // Set the app theme to auto
    }
  };

  const handleOberflacheChange = (value) => {
    if (value) {
      setCurrentAppColorScheme("light"); // Set the app theme to light
    }
  };

  return (
    <View style={styles.container}>
      <ThemeChanger
        currentAppColorScheme={currentAppColorScheme}
        onChange={setCurrentAppColorScheme}
      />
      <StatusBar style={currentTheme.statusBarStyle} />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Tiefsee</Text>
        <Switch value={tiefseeActive} onValueChange={handleTiefseeChange} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Automatisch</Text>
        <Switch
          value={automatischActive}
          onValueChange={handleAutomatischChange}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Oberfläche</Text>
        <Switch
          value={oberflacheActive}
          onValueChange={handleOberflacheChange}
        />
      </View>
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
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      margin: 10,
    },
    switchLabel: {
      fontSize: 16,
      marginRight: 10,
    },
  });

export { AussehenPage };
