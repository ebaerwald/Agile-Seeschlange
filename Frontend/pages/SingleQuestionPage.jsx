import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native'; // Importieren Sie CheckBox von react-native
import Button from '../components/Button';
import DataInputField from '../components/DataInputField';
import SnakeImage from '../components/SnakeImage';
import Background from '../components/Background';
import CustomCheckbox from '../components/Checkbox'; // Importieren Sie die CustomCheckbox-Komponente
import HeaderText from '../components/HeaderText';
import Text from '../components/Text';
import Question from '../components/Question';

const SingleQuestionPage = ({ navigation }) => {
  const [giveAnswer, setAnswer] = useState('');
  const [UserRightsChecked, setUserRightsChecked] = useState(false); // Zustand für die AGB-Checkbox

  const handleAnswerButtonClick = () => {
    // Hier Logik für den Antwortgeben-Button 
    console.log('AGB akzeptiert:', agbChecked);
    //navigation.navigate('Menue');
  };

  return (
    <ScrollView>
    <Background showFooter={true} showBurgerBun={true}>
      {/* Inhalt der Seite */}    
      <View style={styles.outerBox}>

        <SnakeImage size="small" />

        <HeaderText title="Die Frage" type="center" />
        <Question subject="Mathematik" user="UserXY" question="Wie löse ich diese Aufgabe?" navigation={navigation} showAnswers={true} />

        <Text title="Eine Seeschlange hat diese Frage gepostet und braucht Deine Hilfe. Du weißt eine Antwort? Super! Poste deine Antwort und hilf anderen Seeschlangen!" type="center" />

        {/* Eingabefelder für Vorname, Nachname, Geburtsdatum, E-Mail und Passwort */}
        <DataInputField placeholder="Deine Antwort*" value={giveAnswer} onChangeText={text => setAnswer(text)} />

        {/* Checkboxen für AGB und Datenschutz, Verwenden Sie die CustomCheckbox-Komponente */}
        <CustomCheckbox label="Hiermit stimme ich zu, dass meine Antwort veröffentlich wird*" value={UserRightsChecked} onValueChange={value => setUserRightsChecked(value)} />
        <Text title="Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus." type="center" />


      {/* Registrieren-Button */}
      <Button
        onPress={handleAnswerButtonClick}
        iconType="Answer"
        text="Antwort im Meer senden!"
      />

      </View>

    </Background>
          
    </ScrollView>
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

export { SingleQuestionPage };
