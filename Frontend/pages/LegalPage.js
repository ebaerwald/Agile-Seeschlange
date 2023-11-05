import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text,} from "react-native";
import SnakeImage from "../components/SnakeImage";
import Background from "../components/Background";
import HeaderText from "../components/HeaderText";
import SubHeaderText from "../components/SubHeaderText";
import AGB from "../components/AGB";
import Datenschutzerklearung from "../components/Datenschutz";
import FrageHochladenErklaerung from "../components/fragenErklaerung";
import AntwortErklaerung from "../components/antwortErklaerung";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";
import { useEffect, useContext } from "react";
import { impContext } from "../impressive-store/provider";

export function LegalPage({ navigation }) {
  const [showAGB, setShowAGB] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showFrageErklaerung, setShowFrageErklaerung] = useState(false);
  const [showAntwortErklaerung, setShowAntwortErklaerung] = useState(false);

  const { imp } = useContext(impContext);

  useEffect(() => {
    if (!imp.userStore._id) {
      navigation.navigate("Login");
    }
  }, []);

  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  const toggleAGB = () => {
    setShowAGB(!showAGB);
  };

  const toggleDatenschutz = () => {
    setShowDatenschutz(!showDatenschutz);
  };

  const toggleFrageErklaerung = () => {
    setShowFrageErklaerung(!showFrageErklaerung);
  };

  const toggleAntwortErklaerung = () => {
    setShowAntwortErklaerung(!showAntwortErklaerung);
  };

  return (
    <Background>
      <ScrollView>
        <View style={styles.outerBox}>
          <SnakeImage size="small" />
          <HeaderText
            title="Hier findest du unsere Meeresbestimmungen"
            type="center"
          />
          <TouchableOpacity onPress={toggleAGB}>
            <SubHeaderText
              title="Allgemeine Geschäftsbedingungen (AGB)"
              type="center"
            />
          </TouchableOpacity>
          {showAGB && <AGB />}
          <TouchableOpacity onPress={toggleDatenschutz}>
            <SubHeaderText
              title="Allgemeine Datenschutzbestimmungen"
              type="center"
            />
          </TouchableOpacity>
          {showDatenschutz && <Datenschutzerklearung />}
          <TouchableOpacity onPress={toggleFrageErklaerung}>
            <SubHeaderText
              title="Erklärung zum Hochladen von Fragen"
              type="center"
            />
          </TouchableOpacity>
          {showFrageErklaerung && <FrageHochladenErklaerung />}
          <TouchableOpacity onPress={toggleAntwortErklaerung}>
            <SubHeaderText
              title="Erklärung zur Aktualisierung von Antworten"
              type="center"
            />
          </TouchableOpacity>
          {showAntwortErklaerung && <AntwortErklaerung />}
          <Text style={styles.textt}>
            Dieses Produkt wurde von ANG, TID, ERB, SMH entwickelt.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    outerBox: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: 10,
    },
    textt: {
      color: currentTheme.textColor,
    },
  });

export default LegalPage;
