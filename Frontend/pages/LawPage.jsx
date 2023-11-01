import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import SnakeImage from '../components/SnakeImage';
import Background from '../components/Background';
import HeaderText from '../components/HeaderText';
import SubHeaderText from '../components/SubHeaderText';
import Text from '../components/Text';
import AGB from '../components/AGB';
import Datenschutzerklearung from '../components/Datenschutz';
import FrageHochladenErklaerung from '../components/fragenErklaerung';
import AntwortErklaerung from '../components/antwortErklaerung';

const LawPage = ({ navigation }) => {
  const [showAGB, setShowAGB] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showFrageErklaerung, setShowFrageErklaerung] = useState(false);
  const [showAntwortErklaerung, setShowAntwortErklaerung] = useState(false);

  const { imp } = useContext(ImpContext);

  useEffect(() => {
    if (!imp.userStore.id) {
      navigation.navigate('Login');
    }
  }, []);

  const handleGoBackButtonClick = () => {
    // navigation.navigate('Menue');
  };

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
        {/* Inhalt der Seite */}
        <View style={styles.outerBox}>
        <Text>EinstellungenScreen</Text>
         <BackButton /> {/* Zeige den Zurück-Button in dieser Bildschirmkomponente an */}
          <SnakeImage size="small" />
          <HeaderText title="Hier findest du unsere Meeresbestimmungen" type="center" />

          {/* AGB Überschrift und Inhalt */}
          <TouchableOpacity onPress={toggleAGB}>
            <SubHeaderText title="Allgemeine Geschäftsbedingungen (AGB)" type="center" />
          </TouchableOpacity>
          {showAGB && <AGB />}

          {/* Datenschutzerklärung Überschrift und Inhalt */}
          <TouchableOpacity onPress={toggleDatenschutz}>
            <SubHeaderText title="Allgemeine Datenschutzbestimmungen" type="center" />
          </TouchableOpacity>
          {showDatenschutz && <Datenschutzerklearung />}

          {/* Frage Hochladen Erklärung Überschrift und Inhalt */}
          <TouchableOpacity onPress={toggleFrageErklaerung}>
            <SubHeaderText title="Erklärung zum Hochladen von Fragen" type="center" />
          </TouchableOpacity>
          {showFrageErklaerung && <FrageHochladenErklaerung />}

          {/* Antwort Aktualisieren Erklärung Überschrift und Inhalt */}
          <TouchableOpacity onPress={toggleAntwortErklaerung}>
            <SubHeaderText title="Erklärung zur Aktualisierung von Antworten" type="center" />
          </TouchableOpacity>
          {showAntwortErklaerung && <AntwortErklaerung />}

          <Button
            onPress={handleGoBackButtonClick}
            iconType="Default"
            text="Klicke um zurückzukehren."
          />

          <Text title="Dieses Produkt wurde von ANG, TID, ERB, SMH entwickelt." type="center" />
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
});

export { LawPage };
