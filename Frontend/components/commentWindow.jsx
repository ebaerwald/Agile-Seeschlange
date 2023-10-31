import React, { useState } from "react";
import { View, Text, Modal, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

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
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          placeholder="Schreibe deinen Kommentar hier..."
          value={comment}
          onChangeText={(text) => setComment(text)}
          autoFocus={true} // Tastatur automatisch anzeigen
        />
        <Button
          title="Kommentieren"
          onPress={() =>
            onComment(comment, answerId, "", parentAnswer, currThreadId)
          }
        />
        <Button title="Abbrechen" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default CommentWindow;
