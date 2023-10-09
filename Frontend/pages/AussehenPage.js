import React, { useState } from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";


export function AussehenPage() {
  return (
    <View style={styles.container}>
      <Text>AussehenPage!</Text>
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

export default AussehenPage;
