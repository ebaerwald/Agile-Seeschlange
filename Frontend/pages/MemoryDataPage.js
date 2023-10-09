import React, { useState } from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export function MemoryDataPage() {
  return (
    <View style={styles.container}>
      <Text>MemoryDataPage!</Text>
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

export default MemoryDataPage;
