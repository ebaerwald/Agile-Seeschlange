import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CommentWindow from "../components/commentWindow.jsx";
import axios from "axios";
import config from "../config";
import { useEffect, useContext } from "react";
import { impContext } from "../impressive-store/provider";

const Answer = ({
  user,
  answer,
  answers,
  marginOffset,
  answerId,
  parentThread,
}) => {
  const { imp } = useContext(impContext);
  const [commentCount, setCommentCount] = useState(0);
  const [showAnswers] = useState(true);
  const [currentAnswerId, setcurrentAnswerId] = useState("");
  const [isCommentWindowVisible, setCommentWindowVisible] = useState(false);

  const openCommentWindow = (answerId) => {
    setcurrentAnswerId(answerId);
    setCommentWindowVisible(true);
  };

  const closeCommentWindow = () => {
    setCommentWindowVisible(false);
  };

  const addComment = (
    commentText,
    answerId,
    answerOwner,
    parentAnswer,
    parentThread
  ) => {
    addAnswerToObject(
      commentText,
      imp.userStore._id,
      parentAnswer,
      parentThread
    );
    console.log("Kommentar hinzugefügt", parentAnswer, parentThread);
    closeCommentWindow();
  };

  async function addAnswerToObject(
    commentText,
    newAnswerOwner,
    parentAnswer,
    parentThread
  ) {
    console.log(newAnswerOwner);
    const reqData = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `http://${config.serverIP}:3001/api/answer`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: "Miau",
        text: commentText,
        answerOwner: newAnswerOwner,
        parentAnswer: parentAnswer,
        parentThread: parentThread,
      },
    };
    console.log(reqData);
    await axios.request(reqData);
  }

  const handleComment = () => {
    console.log("Es wurde kommentiert");
    setCommentCount(commentCount + 1);
  };

  const newSubanswerStyle = StyleSheet.create({
    backgroundColor: "#72c770",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: marginOffset,
  });
  return (
    <TouchableOpacity onPress={() => openCommentWindow(answerId)}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text>Antwort von {user}:</Text>
        </View>
        <View style={styles.answerContainer}>
          <Text>{answer}</Text>
        </View>
        {answers &&
          answers.map((answer, index) => (
            <View style={newSubanswerStyle}>
              <Answer
                key={index}
                user={answer.answerOwner}
                answer={answer.text}
                answers={answer.answers}
                newShowAnswers={showAnswers}
                marginOffset={20}
                answerId={answer._id}
                parentAnswer={answerId}
                parentThread={parentThread}
              />
            </View>
          ))}

        <CommentWindow
          isVisible={isCommentWindowVisible}
          onComment={addComment}
          onClose={closeCommentWindow}
          answerId={currentAnswerId}
          parentAnswer={answerId}
          parentThread={parentThread}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#72c770",
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    alignItems: "center",
  },
  answerContainer: {
    backgroundColor: "#a4ea7a",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  subAnswerContainer: {
    backgroundColor: "#72c770",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  interactionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Answer;
