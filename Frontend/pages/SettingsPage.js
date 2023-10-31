import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import HeaderText from "../components/HeaderText";
import SnakeImage from "../components/SnakeImage";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks/useTheme";

export function SettingsPage() {
  const navigation = useNavigation();
  const [currentAppColorScheme, setCurrentAppColorScheme] = useState("auto");
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  const aussehenButton = () => {
    navigation.navigate("AussehenPage");
  };

  const notificationButton = () => {
    navigation.navigate("FAQ");
  };

  const kontoButton = () => {
    navigation.navigate("KontoPage");
  };

  const memoryDataButton = () => {
    navigation.navigate("Archiv");
  };

  const TestImpStoreBackendButton = () => {
    navigation.navigate("TestImpStoreBackend");
  };

  const lawButton = () => {
    navigation.navigate("Law");
  };


  return (
    <View style={styles.container}>
      <HeaderText title={"Einstellungen"} type={"center"} />
      <SnakeImage size={"small"} />

      <TouchableOpacity style={styles.button} onPress={kontoButton}>
        <Text style={styles.buttonText}>Kontoeinstellungen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={memoryDataButton}>
        <Text style={styles.buttonText}>Mein Archiv</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={notificationButton}>
        <Text style={styles.buttonText}>FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={lawButton}>
        <Text style={styles.buttonText}>Rechtliche Informationen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={aussehenButton}>
        <Text style={styles.buttonText}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={TestImpStoreBackendButton}>
        <Text style={styles.buttonText}>Hier gehts zur Testseite des ImpStores</Text>
      </TouchableOpacity>
    </View>
  );
}

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: currentTheme.backgroundColor,
    },
    button: {
      backgroundColor: "#a4ea7a",
      padding: 10,
      marginVertical: 10,
      width: 350,
      alignItems: "center",
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 18,
      color: "ffffff",
      fontWeight: "bold",
    },
  });

export default SettingsPage;
