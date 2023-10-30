import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Footer from "./Footer";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";

const Background = ({ children, showFooter, showBurgerBun }) => {
  const handleBurgerMenuClick = () => {
    console.log("Button Burgermenü wurde geklickt");
  };
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.header}>
        {/* Burger-Menü hier hinzufügen */}
        {showBurgerBun && (
          <TouchableOpacity onPress={handleBurgerMenuClick}>
            <Image
              source={require("../assets/WaveIcon.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
      padding: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 10,
    },
    image: {
      width: 30,
      height: 30,
    },
  });

export default Background;
