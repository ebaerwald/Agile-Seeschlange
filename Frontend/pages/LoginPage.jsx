import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'; // Importieren Sie CheckBox von react-native
import Button from '../components/Button';
import DataInputField from '../components/DataInputField';
import SnakeImage from '../components/SnakeImage';
import Background from '../components/Background';
import HeaderText from '../components/HeaderText';
import Text from '../components/Text';

import * as user from "../impressive-store/user";
import { impContext } from "../impressive-store/provider";
import { useContext } from "react";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { imp } = useContext(impContext);

  const handleLoginButtonClick = async() => {
    const res = await user.getUser(imp, {
      name: username,
      googleUserId: '1234567890',
    });
    console.log(res);
    console.log(user.getUser)
    navigation.navigate('Menue');
  };

  const handleRegisterButtonClick = () => {
    navigation.navigate('Register');
  };

  return (

    <Background>
      <View style={styles.outerBox}>

        <SnakeImage size="small" />

        <HeaderText title="Seeschlange" type="center" />

        <Text title="Gib deine Daten an, um die Weltmeere zu betreten und Weisheit zu finden, um anderen Seeschlangen zu helfen." type="center" />


        {/* Eingabefelder für Username und Passwort */}
        <DataInputField placeholder="Username*" value={username} onChangeText={text => setUsername(text)} />
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
    marginTop: 25,
  },
});

export { LoginPage };
