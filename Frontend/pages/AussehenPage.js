import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";
import SubHeaderText from "../components/Text";

const AussehenPage = () => {
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
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
      setCurrentAppColorScheme("dark");
      setTiefseeActive(true);
      setAutomatischActive(false);
      setOberflacheActive(false);
    }
  };

  const handleAutomatischChange = (value) => {
    if (value) {
      setCurrentAppColorScheme("auto");
      setTiefseeActive(false);
      setAutomatischActive(true);
      setOberflacheActive(false);
    }
  };

  const handleOberflacheChange = (value) => {
    if (value) {
      setCurrentAppColorScheme("light");
      setTiefseeActive(false);
      setAutomatischActive(false);
      setOberflacheActive(true);
    }
  };

  return (
    <View style={styles.container}>
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
      color: currentTheme.textColor,
    },
  });

export { AussehenPage };
