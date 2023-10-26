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

const NewQuestionPage = ({ navigation }) => {
  const [UserRightsChecked, setUserRightsChecked] = useState(false); // Zustand für die AGB-Checkbox

  const handleAnswerButtonClick = () => {
    // Hier Logik für den Antwortgeben-Button 
    console.log('AGB akzeptiert:', UserRightsChecked);
    navigation.navigate('Menue');
  };

  return (
    <ScrollView>
    <Background>
      {/* Inhalt der Seite */}    
      <View style={styles.outerBox}>

        <SnakeImage size="small" />

        <HeaderText title="Deine Frage" type="center" />
        <Question subject="Mathematik" user="UserXY" question="" navigation={navigation} showAnswers={false} newQuestion={true} />

        <CustomCheckbox label="Hiermit stimme ich zu, dass meine Frage im Meer veröffentlich wird*" value={UserRightsChecked} onValueChange={value => setUserRightsChecked(value)} />
        <Text title="Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus." type="center" />


      {/* Registrieren-Button */}
      <Button
        onPress={handleAnswerButtonClick}
        iconType="Answer"
        text="Frage im Meer stellen!"
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
    marginTop: 50,
  },
});

export { NewQuestionPage };
