import React, { useState } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import * as Notifications from "expo-notifications";
import Background from "../components/Background";
import SnakeImage from "../components/SnakeImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";
import { useEffect, useContext } from "react";
import { impContext } from "../impressive-store/provider";

export function NotificationsPage({ navigation }) {
  const { currentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);
  const [isEnabled, setIsEnabled] = useState(false);
  const { imp } = useContext(impContext);

  useEffect(() => {
    if (!imp.userStore._id) {
      navigation.navigate("Login");
    }
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("No notification permissions!");
      }
    };
    requestPermissions();

    const loadSwitchState = async () => {
      try {
        const value = await AsyncStorage.getItem("notificationSwitchState");
        if (value === "true") {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      } catch (error) {
        console.error("Error loading switch state from AsyncStorage: ", error);
      }
    };
    loadSwitchState();
  }, []);

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);

    try {
      await AsyncStorage.setItem(
        "notificationSwitchState",
        isEnabled ? "false" : "true"
      );
      if (!isEnabled) {
        scheduleNotification();
      } else {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
    } catch (error) {
      console.error("Error saving switch state to AsyncStorage: ", error);
    }
  };

  async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Long time no see! 👋",
        body: "Du warst schon lange nicht mehr hier, möchtest du nicht mal wieder reinschauen? 😥",
        data: { data: "goes here" },
      },
      trigger: { seconds: 30, repeats: true },
    });
  }

  return (
    <Background>
      <View style={styles.container}>
        <SnakeImage size={"big"}></SnakeImage>
        <Text style={styles.title}>Mitteilungen Einschalten</Text>
        <Text style={styles.text}>
          Schalte die Mitteilungen ein, damit du tägliche Reminders erhälts.
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </Background>
  );
}

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
      color: currentTheme.textColor,
    },
    text: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5,
      color: currentTheme.textColor,
    },
  });

export default NotificationsPage;
