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
import * as ImagePicker from 'expo-image-picker'; 
import ImageViewer from '../components/ImageViewer';

const NewQuestionPage = ({ navigation }) => {
  const [UserRightsChecked, setUserRightsChecked] = useState(false); // Zustand für die AGB-Checkbox
  const PlaceholderImage = require("../assets/IMG_0517.png");
  const [selectedImage, setSelectedImage] = useState(null);
  const handleAnswerButtonClick = () => {
    // Hier Logik für den Antwortgeben-Button 
    console.log('AGB akzeptiert:', UserRightsChecked);
    navigation.navigate('Menue');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <ScrollView>
    <Background>
      {/* Inhalt der Seite */}    
      <View style={styles.outerBox}>

        <SnakeImage size="small" />

        <HeaderText title="Deine Frage" type="center" />
        <Question subject="Mathematik" user="UserXY" question="" navigation={navigation} showAnswers={false} newQuestion={true} />
       
        <Text title="Anstelle eines Textes, kannst du auch ein Foto deiner Frage hochladen." type="center" />
       
        <Button
        onPress={pickImage}
        iconType=""
        text="Foto auswählen"
        />
        
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
        </View>

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
  imageContainer: {
    marginBottom: 10,
  },
});

export { NewQuestionPage };
