import React from "react";
import { StyleSheet, View } from "react-native";

const Background = ({ children }) => {
  return <View style={styles.backgroundContainer}>{children}
  
  </View>;
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "rgba(31, 85, 167, 0.30)",
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default Background;
