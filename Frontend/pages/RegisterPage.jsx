import React, { useState } from "react";
import { StyleSheet, View } from "react-native"; // Importieren Sie CheckBox von react-native
import Button from "../components/Button";
import DataInputField from "../components/DataInputField";
import SnakeImage from "../components/SnakeImage";
import Background from "../components/Background";
import CustomCheckbox from "../components/Checkbox"; // Importieren Sie die CustomCheckbox-Komponente
import HeaderText from "../components/HeaderText";
import SubHeaderText from "../components/SubHeaderText";
import { ScrollView } from "react-native";
import * as user from "../impressive-store/user";
import { impContext } from "../impressive-store/provider";
import { useEffect, useContext } from "react";

const RegisterPage = ({ navigation }) => {
  const { imp } = useContext(impContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agbChecked, setAgbChecked] = useState(false); // Zustand für die AGB-Checkbox
  const [datenschutzChecked, setDatenschutzChecked] = useState(false); // Zustand für die Datenschutz-Checkbox

  const handleLoginButtonClick = () => {
    navigation.navigate("Login");
  };

  const handleRegisterButtonClick = async () => {
    if (!agbChecked || !datenschutzChecked) {
      // Überprüfen, ob beide Checkboxen angehakt sind
      alert("Bitte stimme unseren Bestimmungen zu.");
    } else {
      const res = await user.createUser(imp, {
        email: email,
        name: username,
        googleUserId: "1234567890",
      });
      console.log(res);
      navigation.navigate("MenuePage");
    }
  };

  return (
    <Background>
      <ScrollView>
        {/* Inhalt der Seite */}
        <View style={styles.outerBox}>
          <SnakeImage size="small" />

          <HeaderText title="Seeschlange" type="center" />
          <SubHeaderText
            title="Gib deine Daten an, um die Weltmeere zu betreten und Weisheit zu finden, um anderen Seeschlangen zu helfen."
            type="center"
          />

          {/* Eingabefelder für Vorname, Nachname, Geburtsdatum, E-Mail und Passwort */}
          <DataInputField
            placeholder="Username*"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <DataInputField
            placeholder="E-Mail*"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <DataInputField
            placeholder="Passwort*"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          {/* Checkboxen für AGB und Datenschutz, Verwenden Sie die CustomCheckbox-Komponente */}
          <CustomCheckbox
            label="Hiermit stimme ich den AGB zu*"
            value={agbChecked}
            onValueChange={(value) => setAgbChecked(value)}
          />
          <CustomCheckbox
            label="Hiermit stimme ich den Datenschutzbestimmungen zu*"
            value={datenschutzChecked}
            onValueChange={(value) => setDatenschutzChecked(value)}
          />

          <SubHeaderText
            title="Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus."
            type="center"
          />

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
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
});

export { RegisterPage };
