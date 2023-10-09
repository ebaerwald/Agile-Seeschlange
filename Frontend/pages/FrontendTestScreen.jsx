import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FrontendTestScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>
        Diese Seite dient der Navigation zu allen erstellten Seiten und ist
        lediglich für Testzwecke angelegt.
      </Text>
      <Button
        onPress={() => navigation.navigate("SplashScreen")}
        title={"Go to Splash-Screen"}
      />
      <Button
        onPress={() => navigation.navigate("LoginPage")}
        title={"Go to LoginPage"}
      />
      <Button
        onPress={() => navigation.navigate("RegisterPage")}
        title={"Go to RegisterPage"}
      />
      <Button
        onPress={() => navigation.navigate("MenuePage")}
        title={"Go to MenuePage"}
      />
      <Button
        onPress={() => navigation.navigate("ArchivPage")}
        title={"Go to ArchivPage"}
      />
      <Button
        onPress={() => navigation.navigate("FaqPage")}
        title={"Go To FAQ"}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { FrontendTestScreen };
