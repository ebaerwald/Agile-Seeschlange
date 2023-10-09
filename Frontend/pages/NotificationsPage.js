import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export function NotificationsPage() {
  return (
    <View style={styles.container}>
      <Text>MitteilungenPage!</Text>
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

export default NotificationsPage;
