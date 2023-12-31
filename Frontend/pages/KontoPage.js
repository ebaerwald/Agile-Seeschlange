import { useEffect, useContext } from "react";
import { StyleSheet, View, Text, ScrollView, Button, Alert } from "react-native";
import SnakeImage from "../components/SnakeImage";
import HeaderText from "../components/HeaderText";
import Background from "../components/Background";
import { impContext } from "../impressive-store/provider";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";
import { useNavigation } from "@react-navigation/native";

export function KontoPage() {
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);
  const navigation = useNavigation();

  const { imp } = useContext(impContext);

  useEffect(() => {
    if (!imp.userStore._id) {
      navigation.navigate("Login");
    }
  }, []);

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
          <Text style={styles.textt}>
            Hier findest du all deine nautischen Daten!
          </Text>
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>User ID:</Text>
              <Text style={styles.userInfoText}>{imp.userStore._id}</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Dein Name:</Text>
              <Text style={styles.userInfoText}>{imp.userStore.name}</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Deine Mail:</Text>
              <Text style={styles.userInfoText}>{imp.userStore.email}</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>Favoriten:</Text>
              <Text style={styles.userInfoText}>
                {imp.userStore.favoriteThreads.length}
              </Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>erstellt am:</Text>
              <Text style={styles.userInfoText}>
                {getDateString(imp.userStore.createdAt)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Konto löschen"
            onPress={handleDeleteUser}
            color="red"
            style={styles.deleteButton}
          />
        </View>
      </ScrollView>
    </Background>
  );
}

const getDateString = (newDate) => {
  const date = new Date(newDate);
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  return `${day}.${month}.${year}`;
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    textt: {
      color: currentTheme.textColor,
    },
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
      color: currentTheme.textColor,
    },
    userInfoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    userInfoLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: currentTheme.textColor,
    },
    userInfoText: {
      fontSize: 16,
      color: currentTheme.textColor,
    },
    buttonContainer: {
      marginBottom: 20,
    },
    deleteButton: {
      padding: 20,
    },
  });

export default KontoPage;
