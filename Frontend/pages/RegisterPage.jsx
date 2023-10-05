import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Button from '../components/Button';
import DataInputField from '../components/DataInputField';
import SnakeImage from '../components/SnakeImage';
import Background from '../components/Background';
import CustomCheckbox from '../components/Checkbox';
import HeaderText from '../components/HeaderText';
import Text from '../components/Text';

const RegisterPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agbChecked, setAgbChecked] = useState(false); // Zustand für die AGB-Checkbox
  const [datenschutzChecked, setDatenschutzChecked] = useState(false); // Zustand für die Datenschutz-Checkbox
  const [isChecked, setChecked] = useState(false);

  const handleLoginButtonClick = () => {
    // Hier Logik für den Login-Button 
    console.log('Login-Button wurde geklickt');
    console.log('E-Mail:', email);
    console.log('Passwort:', password);
  };

  const handleRegisterButtonClick = () => {
    // Hier Logik für den Registrieren-Button 
    console.log('Register-Button wurde geklickt');
    console.log('Vorname:', firstName);
    console.log('Nachname:', lastName);
    console.log('Geburtsdatum:', birthdate);
    console.log('E-Mail:', email);
    console.log('Passwort:', password);
    console.log('AGB akzeptiert:', agbChecked);
    console.log('Datenschutzbestimmungen akzeptiert:', datenschutzChecked);
    navigation.navigate('Menue');
  };

  return (
    <ScrollView>
    <Background showFooter={false} showBurgerBun={false}>
      {/* Inhalt der Seite */}    
      <View style={styles.outerBox}>

        <SnakeImage size="small" />

        <HeaderText title="Seeschlange" type="center" />
        <Text title="Gib deine Daten an, um die Weltmeere zu betreten und Weisheit zu finden, um anderen Seeschlangen zu helfen." type="center" />

        {/* Eingabefelder für Vorname, Nachname, Geburtsdatum, E-Mail und Passwort */}
        <DataInputField placeholder="Vorname*" value={firstName} onChangeText={text => setFirstName(text)} />
        <DataInputField placeholder="Nachname*" value={lastName} onChangeText={text => setLastName(text)} />
        <DataInputField placeholder="Geburtsdatum*" value={birthdate} onChangeText={text => setBirthdate(text)} />
        <DataInputField placeholder="E-Mail*" value={email} onChangeText={text => setEmail(text)} />
        <DataInputField placeholder="Passwort*" value={password} onChangeText={text => setPassword(text)} />

        {/* Checkboxen für AGB und Datenschutz, Verwenden Sie die CustomCheckbox-Komponente */}
        <CustomCheckbox label="Hiermit stimme ich den AGB zu*" value={agbChecked} onValueChange={value => setAgbChecked(value)} />
        <CustomCheckbox label="Hiermit stimme ich den Datenschutzbestimmungen zu*" value={datenschutzChecked} onValueChange={value => setDatenschutzChecked(value)} />
        
        <Text title="Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus." type="center" />


      {/* Registrieren-Button */}
      <Button
        onPress={handleRegisterButtonClick}
        iconType="Register"
        text="Klicke hier um die Registrierung ab zuschließen!"
      />

      {/* Login-Button */}
      <Button
        onPress={handleLoginButtonClick}
        iconType="Login"
        text="Bereits eine Seeschlange? Dann logge dich hier ein"
      />

      <Text title="Dieses Produkt wurde von ANG, TID, ERB, SMH entwickelt." type="center" />

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

export { RegisterPage };
