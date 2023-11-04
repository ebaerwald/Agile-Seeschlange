import React, { useState } from "react";
import { View, Text, Modal, TextInput, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";
import Button from "../components/Button";

const CommentWindow = ({
  isVisible,
  onComment,
  onClose,
  answerId,
  parentAnswer,
  parentThread,
}) => {
  const [comment, setComment] = useState();
  const { currThreadId } = useSelector((state) => state.currThreads);
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);
  return (

    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.textinputcontainer}>
          <TextInput
            placeholder="Schreibe deinen Kommentar hier..."
            value={comment}
            onChangeText={(text) => setComment(text)}
            autoFocus={true} // Tastatur automatisch anzeigen
          />
        </View>
        <Button
          text="Kommentieren"
          iconType="Comment"
          onPress={() =>
            onComment(comment, answerId, "", parentAnswer, currThreadId)
          }
        />
        <Button
            onPress={onClose}
            iconType="XMark"
            text="Abbrechen"
          />

      </View>
    </Modal>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: currentTheme.backgroundColor,
  },textinputcontainer: {
    height: '10%',
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#a4ea7a',
    marginBottom: 50,
    borderRadius: 20,
  },
});

export default CommentWindow;
