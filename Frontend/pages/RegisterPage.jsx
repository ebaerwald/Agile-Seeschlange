import React, { useState } from "react";
import { StyleSheet, View } from "react-native"; // Importieren Sie CheckBox von react-native
import Button from "../components/Button";
import DataInputField from "../components/DataInputField";
import SnakeImage from "../components/SnakeImage";
import Background from "../components/Background";
import CustomCheckbox from "../components/Checkbox"; // Importieren Sie die CustomCheckbox-Komponente
import HeaderText from "../components/HeaderText";
import Text from "../components/Text";
import { ScrollView } from "react-native";
import * as user from "../impressive-store/user";
import { impContext } from "../impressive-store/provider";
import { useEffect, useContext } from "react";


const RegisterPage = ({ navigation }) => {

  const { imp } = useContext(impContext);
  useEffect(() => {
      console.log(imp)
  }, [imp]);

  const [name, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agbChecked, setAgbChecked] = useState(false); // Zustand für die AGB-Checkbox
  const [datenschutzChecked, setDatenschutzChecked] = useState(false); // Zustand für die Datenschutz-Checkbox
  const [isChecked, setChecked] = useState(false);

  const handleLoginButtonClick = () => {
    // Hier Logik für den Login-Button
    navigation.navigate("Login");
  };

  const handleRegisterButtonClick = () => {
    user.createUser(imp, {
      "email": email,
      "name": name,
      "lastName": lastName,
      "googleUserId": '1234567890',
      }
    );
    navigation.navigate("Register");
  };

  return (
    <ScrollView>
      <Background>
        {/* Inhalt der Seite */}
        <View style={styles.outerBox}>
          <SnakeImage size="small" />

          <HeaderText title="Seeschlange" type="center" />
          <Text
            title="Gib deine Daten an, um die Weltmeere zu betreten und Weisheit zu finden, um anderen Seeschlangen zu helfen."
            type="center"
          />

          {/* Eingabefelder für Vorname, Nachname, Geburtsdatum, E-Mail und Passwort */}
          <DataInputField
            placeholder="Username*"
            value={name}
            onChangeText={(text) => setUsername(text)}
          />
          <DataInputField
            placeholder="Nachname*"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
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

          <Text
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
      </Background>
    </ScrollView>
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
