import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'; // Importieren Sie CheckBox von react-native
import Button from '../components/Button';
import DataInputField from '../components/DataInputField';
import SnakeImage from '../components/SnakeImage';
import Background from '../components/Background';
import HeaderText from '../components/HeaderText';
import Text from '../components/Text';


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButtonClick = () => {
    // Hier die Logik für den Login-Button
    console.log('Login-Button wurde geklickt');
    console.log('E-Mail:', email);
    console.log('Passwort:', password);
    navigation.navigate('Menue');
  };

  const handleRegisterButtonClick = () => {
    // Hier die Logik für den Registrieren-Button
    console.log('Register-Button wurde geklickt');
    navigation.navigate('Register');
  };

  return (
    <Background showFooter={false} showBurgerBun={false}>
      {/* Inhalt der Seite */}
      <View style={styles.outerBox}>

        <SnakeImage size="small" />

        <HeaderText title="Seeschlange" type="center" />

        <Text title="Gib deine Daten an, um die Weltmeere zu betreten und Weisheit zu finden, um anderen Seeschlangen zu helfen." type="center" />


        {/* Eingabefelder für E-Mail und Passwort */}
        <DataInputField placeholder="E-Mail*" value={email} onChangeText={text => setEmail(text)} />
        <DataInputField placeholder="Passwort*" value={password} onChangeText={text => setPassword(text)} />

        <Text title=" Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus." type="center" />

      {/* Login-Button */}
      <Button
        onPress={handleLoginButtonClick}
        iconType="Login"
        text="Willkommen zurück kleine Seeschlange!"
      />

      {/* Registrieren-Button */}
      <Button
        onPress={handleRegisterButtonClick}
        iconType="Register"
        text="Noch keine Seeschlange? Dann registriere dich ein!"
      />

      <Text title="Dieses Produkt wurde von ANG, TID, ERB, SMH entwickelt." type="center" />

      </View>
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

export { LoginPage };
