import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native'; // Importieren Sie CheckBox von react-native
import Button from '../components/Button';
import DataInputField from '../components/DataInputField';
import SnakeImage from '../components/SnakeImage';
import Background from '../components/Background';
import HeaderText from '../components/HeaderText';
import Text from '../components/Text';

import * as user from "../impressive-store/user";
import { impContext } from "../impressive-store/provider";
import { useContext } from "react";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

const client_secret = 'c8ddd91ff2112a4c3edf79b4afd78261fbb62da6';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/96f22eaf46e6f1bcdb9f',
};

WebBrowser.maybeCompleteAuthSession();

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const [action, setAction] = useState('register'); 
  const { imp } = useContext(impContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '96f22eaf46e6f1bcdb9f',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        "scheme": "agile-seeschlange"
      }),
    },
    discovery
  );

  useEffect(() => {
      if (response?.type === 'success') {
        setErrorMessage('Sucessfully logged in!');
        const { code } = response.params;
        console.log(code);
        fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `client_id=96f22eaf46e6f1bcdb9f&client_secret=${client_secret}&code=${code}`,
        })
          .then((response) => {
            if (response.ok) {
              return response.text();
            } else {
              throw new Error(`Request failed with status: ${response.status}`);
            }
          })
          .then((data) => {
            const access_token = data.split('&')[0].split('=')[1];
            console.log(access_token);
            async() => {
              const res = await user.signUpUser(imp, {
                access_token: access_token,
              });
              if (!res)
              {
                setErrorMessage('GitHub LogIn failed!');
                return;
              }
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
      else
      {
        setErrorMessage('GitHub LogIn failed! Error: ' + response?.error || 'unknown error');
      }
    
  }, [response])

  const handleLoginRegister = async() => {
    if (action === 'register')
    {
      const res = await user.signUpUser(imp, {
        name: username,
        email: email,
        password: user.hashPassword(password),
      });
      if (!res)
      {
        setErrorMessage('Registration failed!');
        return;
      }
    }
    else
    { 
      const userInfo = usernameOrEmail.includes('@') ? { email: usernameOrEmail } : { name: usernameOrEmail };
      const res = await user.signUpUser(imp, {
        ...userInfo,
        password: user.hashPassword(password),
      });
      if (!res)
      {
        setErrorMessage('Login failed!');
        return;
      }
    }
    navigation.navigate('Menue');
  };

  return (
    <Background>
      <ScrollView>
      <View style={styles.outerBox}>

        <SnakeImage size="small" />

        <HeaderText title="Seeschlange" type="center" />

        <Text title="Gib deine Daten an, um die Weltmeere zu betreten und Weisheit zu finden, um anderen Seeschlangen zu helfen." type="center" />


        {/* Eingabefelder für Username und Passwort */}
        <View>
          
        </View>
        {
          action === 'register' && (
            <>
              <View style={{width: '100%', marginTop: 10, marginBottom: 10}}>
                <DataInputField placeholder="Username*" value={username} onChangeText={text => setUsername(text)} />
                <DataInputField placeholder="Email*" value={email} onChangeText={text => setEmail(text)} />
                <DataInputField placeholder="Passwort*" value={password} onChangeText={text => setPassword(text)} 
                  secureTextEntry={true}
                />
                <Text>{errorMessage}</Text>
              </View>
              <Button
                text="Send"
                iconType="Send"
                onPress={() => handleLoginRegister()}
              />
              <Button 
                text="Login with GitHub"
                iconType="GitHub"
                onPress={() => promptAsync()}
                disabled={!request}
              />
              <Button
                text="Login"
                iconType="Login"
                onPress={() => setAction('login')}
              />
            </>
          )
        }
        {
          action === 'login' && (
            <>
              <View style={{width: '100%', marginTop: 10, marginBottom: 10}}>
                <DataInputField placeholder="Username or Email*" value={usernameOrEmail} onChangeText={text => setUsernameOrEmail(text)} />
                <DataInputField placeholder="Passwort*" value={password} onChangeText={text => setPassword(text)}
                  secureTextEntry={true}
                />
                <Text>{errorMessage}</Text>
              </View>
              <Button
                text="Send"
                iconType="Send"
                onPress={() => handleLoginRegister()}
              />
              <Button 
                text="Login with GitHub"
                iconType="GitHub"
                onPress={() => promptAsync()}
                disabled={!request}
              />
              <Button
                text="Register"
                iconType="Register"
                onPress={() => setAction('register')}
              />
            </>
          )
        }

        {/* <DataInputField placeholder="Username*" value={username} onChangeText={text => setUsername(text)} />
        <DataInputField placeholder="Passwort*" value={password} onChangeText={text => setPassword(text)} /> */}

        <Text title=" Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus." type="center" />

      {/* Login-Button */}
      {/* <Button
        onPress={handleLoginButtonClick}
        iconType="Login"
        text="Sign In"
      /> */}

      {/* Registrieren-Button */}
      {/* <Button
        onPress={handleRegisterButtonClick}
        iconType="Register"
        text="Noch keine Seeschlange? Dann registriere dich ein!"
      /> */}

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
    marginTop: 25,
  },
});

export { LoginPage };
