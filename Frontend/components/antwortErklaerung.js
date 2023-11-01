import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";

const AntwortErklaerung = () => {
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);
  return (
    <View>
      <Text style={styles.heading}>
        Willkommen zurück, mutige/r Frage-Antworter/in der Seeschlangen!
      </Text>
      <Text style={styles.paragraph}>
        Du hast eine Antwort gefunden und möchtest sie mit der
        Meeresgemeinschaft teilen? Bevor du deine Erkenntnis an andere
        weitergibst, bitten wir dich, die folgende Erklärung zu akzeptieren.
      </Text>

      <Text style={styles.subheading}>
        1. Gemeinschaftlicher Wissensaustausch:
      </Text>
      <Text style={styles.paragraph}>
        Indem du deine Antwort aktualisierst, trägst du zur Bereicherung der
        Seeschlangen-Meeresgemeinschaft bei. Dein Wissen und deine Erfahrungen
        helfen anderen, ihre Fragen zu beantworten und ihre Reise des Wissens
        fortzusetzen.
      </Text>

      <Text style={styles.subheading}>2. Klarheit und Hilfreichkeit:</Text>
      <Text style={styles.paragraph}>
        Bitte formuliere deine Antwort so klar und präzise wie möglich. Bemühe
        dich, anderen Meeresbewohnern hilfreiche Informationen bereitzustellen,
        um ihr Verständnis zu vertiefen und ihnen bei ihren Anliegen zu helfen.
      </Text>

      <Text style={styles.subheading}>3. Respektvolle Interaktion:</Text>
      <Text style={styles.paragraph}>
        Behandle andere Fragesteller und Antwortgeber stets mit Respekt und
        Höflichkeit, auch wenn du anderer Meinung bist. Schätze die Vielfalt der
        Meinungen und Lösungsansätze und trage zu einer positiven Atmosphäre
        bei.
      </Text>

      <Text style={styles.subheading}>4. Korrektheit und Verlässlichkeit:</Text>
      <Text style={styles.paragraph}>
        Stelle sicher, dass deine Antwort korrekt und zuverlässig ist. Überprüfe
        deine Informationen, um Fehlinformationen zu vermeiden. Falls du
        unsicher bist, teile bitte deine Quellen oder kennzeichne deine Antwort
        als Meinung.
      </Text>

      <Text style={styles.paragraph}>
        Durch das Aktualisieren deiner Antwort erklärst du dich damit
        einverstanden, diese Grundsätze zu beachten und zur Förderung des
        gemeinschaftlichen Wissensaustauschs beizutragen. Wir danken dir für
        deine Beteiligung und freuen uns auf weitere inspirierende Begegnungen
        im Meer des Wissens.
      </Text>

      <Text style={styles.paragraph}>
        Wenn du Fragen zu dieser Erklärung hast oder Unterstützung benötigst,
        wende dich bitte an unser Unterwasser-Service-Team, das aus freundlichen
        Meeresbiologen und hilfsbereiten Seeschlangen-Experten besteht.
      </Text>
    </View>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: currentTheme.textColor,
    },
    subheading: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 12,
      marginBottom: 6,
      color: currentTheme.textColor,
    },
    paragraph: {
      color: currentTheme.textColor,
    },
  });

export default AntwortErklaerung;
