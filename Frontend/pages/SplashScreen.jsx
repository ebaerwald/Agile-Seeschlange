import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
import SnakeImage from '../components/SnakeImage';
import HeaderText from '../components/HeaderText';
import Text from '../components/Text';

const SplashScreen = ({ navigation }) => {

  const { imp } = useContext(impContext);
  useEffect(() => {
    if (!imp.userStore.id) {
      navigation.navigate('Login');
    }
  }, []);

  const handleLoginButtonClick = () => {
    // Hier Logik für den Login-Button
    console.log('Login-Button wurde geklickt');
    navigation.navigate('Login');
  };

  const handleRegisterButtonClick = () => {
    // Hier die Logik für den Registrieren-Button 
    console.log('Register-Button wurde geklickt');
    navigation.navigate('Register');
  };

  return (
    <Background >
      <View style={styles.outerBox}>
        <View>
        <SnakeImage size="!small" />
        </View>

        <HeaderText title="Seeschlange" type="center" />
        <Text title="Herzlichen Willkommen auf den Weltmeeren des unendlichen Wissens!" type="center" />

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
        text="Noch keine Seeschlange? Dann registriere dich hier!"
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

export {SplashScreen};
