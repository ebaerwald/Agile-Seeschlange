import React from "react";
import { View, Text } from 'react-native';

const FrageHochladenErklaerung = () => {
  return (
    <View>
      <Text style={styles.header}>Willkommen an Bord, mutige/r Fragesteller/in der Seeschlangen!</Text>
      <Text>
        Tauche ein in die Tiefen des Seeschlangen-Projekts und lass deine Frage die Wogen der Information ergründen. Bevor du deine Neugierde mit unserer Meeresgemeinschaft teilst, möchten wir dich darum bitten, die folgende Erklärung zu akzeptieren.
      </Text>

      <Text style={styles.subHeader}>1. Gemeinsame Entdeckungsreise:</Text>
      <Text>
        Indem du deine Frage auf unserer Website hochlädst, begibst du dich auf eine aufregende Reise des Wissensaustauschs. Du wirst Teil einer Gemeinschaft von Meeresenthusiasten, die sich gegenseitig unterstützen und inspirieren.
      </Text>

      <Text style={styles.subHeader}>2. Verantwortungsvoller Informationsaustausch:</Text>
      <Text>
        Wir bitten dich, sicherzustellen, dass deine Frage klar, präzise und respektvoll formuliert ist. Sei bereit, anderen Meeresbewohnern zu helfen, indem du nützliche Informationen und Erkenntnisse teilst.
      </Text>

      <Text style={styles.subHeader}>3. Offenheit für vielfältige Antworten:</Text>
      <Text>
        In der Seeschlangen-Meeresgemeinschaft schätzen wir die Vielfalt der Meinungen und Lösungsansätze. Sei offen für unterschiedliche Antworten und betrachte sie als wertvolle Ressourcen, um dein Wissen zu erweitern.
      </Text>

      <Text style={styles.subHeader}>4. Respektvolles Miteinander:</Text>
      <Text>
        Wir legen großen Wert auf ein freundliches und respektvolles Miteinander. Behandle andere Fragesteller und Antwortgeber mit Höflichkeit und Wertschätzung, selbst wenn du anderer Meinung bist.
      </Text>

      <Text>
        Durch das Hochladen deiner Frage erklärst du dich damit einverstanden, diese Prinzipien zu respektieren und zu fördern. Wir freuen uns darauf, dich auf deiner Entdeckungsreise zu begleiten und wünschen dir spannende Begegnungen mit den Weisheiten des Meeres.
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

export default FrageHochladenErklaerung;
