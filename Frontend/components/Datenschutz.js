import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";

const Datenschutzerklaerung = ({}) => {
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Datenschutzerklärung für das Seeschlangen-Projekt
      </Text>
      <Text style={styles.paragraph}>
        Wir, die Seeschlangen-Gemeinschaft, nehmen den Schutz deiner
        persönlichen Daten sehr ernst. Daher möchten wir dich mit dieser
        spaßigen Datenschutzerklärung darüber informieren, wie wir mit deinen
        Daten umgehen. Bitte beachte, dass diese Erklärung keinen rechtlichen
        Charakter hat und ausschließlich zu Unterhaltungszwecken dient.
      </Text>

      <Text style={styles.subtitle}>1. Dein Name:</Text>
      <Text style={styles.paragraph}>
        Wir werden deinen Namen mit größter Sorgfalt behandeln und ihn
        keinesfalls an Piraten, Seeungeheuer oder andere fragwürdige Gestalten
        weitergeben.
      </Text>

      <Text style={styles.subtitle}>2. Dein Alter:</Text>
      <Text style={styles.paragraph}>
        Dein Alter ist uns wichtig, um sicherzustellen, dass du alt genug bist,
        um ein echter Seeschlange zu werden. Wir werden dein Alter jedoch nicht
        dazu verwenden, um dir Überraschungspartys oder Geschenke zu
        organisieren.
      </Text>

      <Text style={styles.subtitle}>3. Deine E-Mail-Adresse:</Text>
      <Text style={styles.paragraph}>
        Deine E-Mail-Adresse ist bei uns sicher. Wir werden sie nur verwenden,
        um dir gelegentlich Nachrichten von unserer königlichen Krake namens
        Karl zu schicken. Diese Nachrichten könnten Seemannsgarn, Witze oder
        geheime Schatzkarten enthalten.
      </Text>

      <Text style={styles.subtitle}>4. Dein Passwort:</Text>
      <Text style={styles.paragraph}>
        Dein Passwort ist wie eine geheime Schatztruhe, die nur du öffnen
        kannst. Wir werden dein Passwort niemals herausfinden oder an böswillige
        Meeresbewohner weitergeben. Bitte halte es sicher und teile es mit
        niemandem, außer du möchtest, dass sie dir deinen Kaffee am Morgen ans
        Bett bringen.
      </Text>

      <Text style={styles.subtitle}>5. Deine aktuelle Universität:</Text>
      <Text style={styles.paragraph}>
        Wir sind stolz darauf, eine Gemeinschaft von Seeschlangen aus
        verschiedenen Universitäten zu sein. Deine aktuelle Universität hilft
        uns, festzustellen, ob du das Potenzial hast, ein Meister der Ozeane zu
        werden. Wir werden jedoch niemals deine Universität kontaktieren, um
        ihnen mitzuteilen, dass du tatsächlich eine Seeschlange bist.
      </Text>

      <Text style={styles.paragraph}>
        Bitte beachte, dass du durch die Nutzung unseres Seeschlangen-Projekts
        automatisch zustimmst, Teil unserer spaßigen und verrückten Community zu
        sein. Wir können nicht garantieren, dass du nicht von einer Meereskrabbe
        verfolgt wirst oder dass unsere Schatzkarten immer zu verborgenen
        Reichtümern führen. Aber hey, das ist der Spaß am Seeschlangen-Leben!
      </Text>

      <Text style={styles.paragraph}>
        Falls du Fragen zu unserer Datenschutzerklärung hast, wende dich bitte
        an unsere freundlichen Unterwasseranwälte, die Experten im Umgang mit
        Kraken, Quallen und Datenschutz sind.
      </Text>
    </View>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    container: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: currentTheme.textColor,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
      color: currentTheme.textColor,
    },
    paragraph: {
      fontSize: 14,
      marginBottom: 10,
      color: currentTheme.textColor,
    },
  });

export default Datenschutzerklaerung;
