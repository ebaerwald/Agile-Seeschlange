import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native"; 
import Button from "../components/Button";
import DataInputField from "../components/DataInputField";
import SnakeImage from "../components/SnakeImage";
import Background from "../components/Background";
import HeaderText from "../components/HeaderText";
import SubHeaderText from "../components/SubHeaderText";
import { impContext } from "../impressive-store/provider";
import { useContext } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";
import * as user from "../impressive-store/user";
import * as WebBrowser from "expo-web-browser";
const client_secret = "c8ddd91ff2112a4c3edf79b4afd78261fbb62da6";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/96f22eaf46e6f1bcdb9f",
};

WebBrowser.maybeCompleteAuthSession();

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [action, setAction] = useState("register");
  const { imp } = useContext(impContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "96f22eaf46e6f1bcdb9f",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "agile-seeschlange",
      }),
    },
    discovery
  );
    const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);
  async function githubLogin(code)
  {
    console.log(code);
      const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `client_id=96f22eaf46e6f1bcdb9f&client_secret=${client_secret}&code=${code}`,
      });

      const text = await res.text();
      const access_token = text.split("&")[0].split("=")[1];
      console.log(access_token);
      const response = await user.signUpUser(imp, {
        access_token: access_token,
      });
      if (!response) {
        setErrorMessage("GitHub LogIn failed!");
        return;
      }
      navigation.navigate("MenuePage");
  }

  useEffect(() => {
    if (response?.type === "success") {
      setErrorMessage("Sucessfully logged in!");
      const { code } = response.params;
      githubLogin(code);

    } else {
      setErrorMessage(
        "GitHub LogIn failed! Error: " + response?.error || "unknown error"
      );
    }
  }, [response]);

  const handleLoginRegister = async () => {
    if (action === "register") {
      const res = await user.signUpUser(imp, {
        name: username,
        email: email,
        password: await user.hashPassword(password),
      });
      if (!res) {
        setErrorMessage("Registration failed!");
        return;
      }
    } else {
      const userInfo = usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { name: usernameOrEmail };
      const res = await user.logInUser(imp, {
        ...userInfo,
        password: await user.hashPassword(password),
      });
      if (!res) {
        setErrorMessage("Login failed!");
        return;
      }
    }
    navigation.navigate("MenuePage");
  };

  return (
    <Background>
      <ScrollView>
        <View style={styles.outerBox}>
          <SnakeImage size="small" />

          <HeaderText title="Seeschlange" type="center" />

          <SubHeaderText
            title="Gib deine Daten an, um die Weltmeere zu betreten und Weisheit zu finden, um anderen Seeschlangen zu helfen."
            type="center"
          />
          <View></View>
          {action === "register" && (
            <>
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 10,
                  color: currentTheme.textColor,
                }}
              >
                <DataInputField
                  placeholder="Username*"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
                <DataInputField
                  placeholder="Email*"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <DataInputField
                  placeholder="Passwort*"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                />
                <Text style={styles.textt}>{errorMessage}</Text>
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
                onPress={() => setAction("login")}
              />
            </>
          )}
          {action === "login" && (
            <>
              <View style={{ width: "100%", marginTop: 10, marginBottom: 10 }}>
                <DataInputField
                  placeholder="Username or Email*"
                  value={usernameOrEmail}
                  onChangeText={(text) => setUsernameOrEmail(text)}
                />
                <DataInputField
                  placeholder="Passwort*"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  style={styles.textt}
                />
                <Text style={styles.textt}>{errorMessage}</Text>
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
                onPress={() => setAction("register")}
              />
            </>
          )}
          <SubHeaderText
            title=" Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus."
            type="center"
          />
          <SubHeaderText
            title="Dieses Produkt wurde von ANG, TID, ERB, SMH entwickelt."
            type="center"
          />
        </View>
      </ScrollView>
    </Background>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    textt: {
      color: currentTheme.textColor,
    },
    outerBox: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: 10,
      marginTop: 25,
    },
  });

export { LoginPage };
