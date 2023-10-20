import React from "react";
import { View, Text } from 'react-native';

const AntwortErklaerung = () => {
  return (
    <View>
      <Text style={styles.header}>Willkommen zurück, mutige/r Frage-Antworter/in der Seeschlangen!</Text>
      <Text>
        Du hast eine Antwort gefunden und möchtest sie mit der Meeresgemeinschaft teilen? Bevor du deine Erkenntnis an andere weitergibst, bitten wir dich, die folgende Erklärung zu akzeptieren.
      </Text>

      <Text style={styles.subHeader}>1. Gemeinschaftlicher Wissensaustausch:</Text>
      <Text>
        Indem du deine Antwort aktualisierst, trägst du zur Bereicherung der Seeschlangen-Meeresgemeinschaft bei. Dein Wissen und deine Erfahrungen helfen anderen, ihre Fragen zu beantworten und ihre Reise des Wissens fortzusetzen.
      </Text>

      <Text style={styles.subHeader}>2. Klarheit und Hilfreichkeit:</Text>
      <Text>
        Bitte formuliere deine Antwort so klar und präzise wie möglich. Bemühe dich, anderen Meeresbewohnern hilfreiche Informationen bereitzustellen, um ihr Verständnis zu vertiefen und ihnen bei ihren Anliegen zu helfen.
      </Text>

      <Text style={styles.subHeader}>3. Respektvolle Interaktion:</Text>
      <Text>
        Behandle andere Fragesteller und Antwortgeber stets mit Respekt und Höflichkeit, auch wenn du anderer Meinung bist. Schätze die Vielfalt der Meinungen und Lösungsansätze und trage zu einer positiven Atmosphäre bei.
      </Text>

      <Text style={styles.subHeader}>4. Korrektheit und Verlässlichkeit:</Text>
      <Text>
        Stelle sicher, dass deine Antwort korrekt und zuverlässig ist. Überprüfe deine Informationen, um Fehlinformationen zu vermeiden. Falls du unsicher bist, teile bitte deine Quellen oder kennzeichne deine Antwort als Meinung.
      </Text>

      <Text>
        Durch das Aktualisieren deiner Antwort erklärst du dich damit einverstanden, diese Grundsätze zu beachten und zur Förderung des gemeinschaftlichen Wissensaustauschs beizutragen. Wir danken dir für deine Beteiligung und freuen uns auf weitere inspirierende Begegnungen im Meer des Wissens.
      </Text>

      <Text>
        Wenn du Fragen zu dieser Erklärung hast oder Unterstützung benötigst, wende dich bitte an unser Unterwasser-Service-Team, das aus freundlichen Meeresbiologen und hilfsbereiten Seeschlangen-Experten besteht.
      </Text>
    </View>
  );
}

const styles = {
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
};

export default AntwortErklaerung;
