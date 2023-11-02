import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";
import SnakeImage from "../components/SnakeImage";
import Ionicons from "@expo/vector-icons/Ionicons";

const AussehenPage = () => {
  const { imp } = useContext(ImpContext);

  useEffect(() => {
    if (!imp.userStore._id) {
      navigation.navigate("Login");
    }
  }, []);
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
      <SnakeImage size={"big"}></SnakeImage>
      <Text style={styles.header}>
        Entscheide selbst wie tief die Seeschlange schwimmt!
      </Text>
      <View style={styles.separator} />
      <View style={styles.switchContainer}>
        <Ionicons name="moon" size={16} style={styles.icon} />
        <Text style={styles.switchLabel}>Tiefsee</Text>
        <Switch value={tiefseeActive} onValueChange={handleTiefseeChange} />
      </View>
      <View style={styles.separator} />
      <View style={styles.switchContainer}>
        <Ionicons name="contrast" size={16} style={styles.icon} />
        <Text style={styles.switchLabel}>Automatisch</Text>
        <Switch
          value={automatischActive}
          onValueChange={handleAutomatischChange}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.switchContainer}>
        <Ionicons name="sunny" size={16} style={styles.icon} />
        <Text style={styles.switchLabel}>Oberfläche</Text>
        <Switch
          value={oberflacheActive}
          onValueChange={handleOberflacheChange}
        />
      </View>
      <View style={styles.separator} />
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
      justifyContent: "space-between",
      width: "70%",
    },
    icon: {
      marginRight: 10,
      color: currentTheme.textColor,
    },
    switchLabel: {
      fontSize: 16,
      color: currentTheme.textColor,
    },
    header: {
      color: currentTheme.textColor,
      fontSize: 15,
    },
    separator: {
      borderBottomWidth: 1,
      borderColor: currentTheme.textColor,
      width: "70%",
      alignSelf: "center",
      marginVertical: 10,
    },
  });

export { AussehenPage };
