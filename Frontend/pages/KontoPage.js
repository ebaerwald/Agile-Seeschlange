import React, { useState } from "react";
import SnakeImage from "../components/SnakeImage";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { HeaderText } from "../components/HeaderText";

export function KontoPage() {
  return (
    <View style={styles.container}>
      <SnakeImage size={"small"} />
      <HeaderText title="Seeschlange" type="center" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default KontoPage;
