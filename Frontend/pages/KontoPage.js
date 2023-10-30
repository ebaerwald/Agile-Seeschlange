import { useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import SnakeImage from "../components/SnakeImage";
import HeaderText from "../components/HeaderText";
import Background from "../components/Background";
import * as user from "../impressive-store/user";
import { impContext } from "../impressive-store/provider";

export function KontoPage() {
  const { imp } = useContext(impContext);
  useEffect(() => {
    console.log(imp);
  }, [imp]);

  const userTest = {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@example.com",
  };

  const handleDeleteUser = () => {
    Alert.alert(
      "Dein Konto Löschen",
      "Bist du dir sicher, dass du dein Konto unwiderruflich löschen möchtest?",
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () => {
            {
              async () => {
                user.deleteUser(imp, {
                  googleUserId: "1234567890",
                });
              };
            }
            Alert.alert("Konto gelöscht", "Dein Konto wurde gelöscht");
          },
        },
      ]
    );
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContent}>
          <SnakeImage size={"big"}></SnakeImage>
          <HeaderText title={"Dein Konto"}></HeaderText>
          <Text>Hier findest du all deine nautischen Daten!</Text>
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Dein Name:</Text>
              <Text style={styles.userInfoText}>
                {userTest.firstName} {userTest.lastName}
              </Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Deine Mail:</Text>
              <Text style={styles.userInfoText}>{userTest.email}</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Dein Geburtstag:</Text>
              <Text style={styles.userInfoText}>21.03.2002</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Dein Alter:</Text>
              <Text style={styles.userInfoText}>21</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Deine Telefonnummer:</Text>
              <Text style={styles.userInfoText}>32423498123</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Dein Geschlecht:</Text>
              <Text style={styles.userInfoText}>Weiblich</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Konto löschen"
            onPress={handleDeleteUser}
            color="red" // Set the button color to red
            style={styles.deleteButton} // Add custom style for the button
          />
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  topContent: {
    flex: 1,
    alignItems: "center",
  },
  userInfoContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userInfoText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20, // Add space between user info and the button
  },
  deleteButton: {
    padding: 20,
  },
});

export default KontoPage;
