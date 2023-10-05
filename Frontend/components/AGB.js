import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const AGB = ({}) => {

  return (
    <View style={styles.container}>
      <Text>
        Willkommen bei den verrückten Abenteuern der Seeschlangen! Bevor du dich in die Tiefen des Ozeans begibst, möchten wir dich mit unseren spaßigen AGB vertraut machen. Bitte beachte, dass diese AGB keinen rechtlichen Charakter haben und ausschließlich zu Unterhaltungszwecken dienen.
      </Text>

      <Text style={styles.subheading}>1. Seeschlange werden:</Text>
      <Text>
        Indem du unsere Dienste nutzt und Teil der Seeschlangen-Gemeinschaft wirst, stimmst du zu, dich in ein majestätisches Wesen zu verwandeln, das die sieben Weltmeere beherrscht. Du erhältst Zugang zu exklusiven Unterwasserpartys und wirst zu einem Experten in der Kunst des Meeresgesangs.
      </Text>

      <Text style={styles.subheading}>2. Gefahren des Ozeans:</Text>
      <Text>
        Wir möchten dich darauf hinweisen, dass das Seeschlangen-Leben nicht ohne Risiken ist. Du könntest auf verrückte Seeungeheuer, tückische Strudel und sogar auf eine Kreuzung zwischen einem Hai und einem Tintenfisch namens "Sharktopus" treffen. Wir übernehmen keine Haftung für solche Begegnungen und empfehlen dir, immer einen magischen Dreizack und eine Flasche Unterwasserluftfrische dabei zu haben.
      </Text>

      <Text style={styles.subheading}>3. Schätze und Belohnungen:</Text>
      <Text>
        Als echte Seeschlange hast du die Chance, verborgene Schätze zu entdecken und mit anderen Mitgliedern der Gemeinschaft zu teilen. Bitte beachte jedoch, dass die gefundenen Schätze möglicherweise aus wertvollen Kieselsteinen, Muscheln oder dem berühmten "Seepferdchen des Glücks" bestehen können. Wir übernehmen keine Verantwortung für den Wert oder die Verwendung dieser Schätze.
      </Text>

      <Text style={styles.subheading}>4. Königliche Krake:</Text>
      <Text>
        Unser geliebter König der Seeschlangen, Karl, behält sich das Recht vor, gelegentlich durch die Ozeane zu gleiten und nach den neuesten Seeschlange-Trends zu suchen. Wenn du ihm begegnest, halte bitte ein königliches Nicken oder einen Seeschlangen-Gruß bereit. Karl liebt es, Selfies mit Seeschlangen zu machen und sie auf seinen sozialen Medien zu teilen.
      </Text>

      <Text style={styles.subheading}>5. Unterwasser-Feiern:</Text>
      <Text>
        Wir organisieren regelmäßig Unterwasser-Partys mit Live-Musik, Meeresbuffets und Tanzwettbewerben. Indem du unsere Dienste nutzt, erklärst du dich damit einverstanden, bei diesen extravaganten Feiern dein bestes Schlangen-Tanzbein zu schwingen und dich an die verbindlichen Dresscode-Standards zu halten (funkelnde Schuppen und bunte Meerjungfrauen-Outfits sind ausdrücklich erwünscht).
      </Text>

      <Text>
        Bitte beachte, dass du durch die Nutzung unseres Seeschlangen-Projekts automatisch in unsere verrückte Gemeinschaft eintreten und akzeptieren, dass wir keinen Einfluss auf den Humor der Meerestiere haben. Wir können nicht garantieren, dass du von Delfinen Witze erzählt bekommst oder dass Krabbenstand-up-Comedy-Shows immer lustig sind.
      </Text>

      <Text>
        Falls du Fragen zu unseren spaßigen AGB hast, wende dich bitte an unser Unterwasser-Service-Team, das aus freundlichen Meeresbiologen und professionellen Spaßvermittlern besteht.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
});

export default AGB;
