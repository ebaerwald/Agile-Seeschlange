import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InteractionButton from "../components/InteractionButton"; // Importiere die Button-Komponente

import CommentWindow from "../components/commentWindow.jsx";
import axios from "axios";
import config from "../config";

const Answer = ({
  user,
  answer,
  answers,
  marginOffset,
  answerId,
  parentAnswer,
  parentThread,
}) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [superlikeCount, setSuperlikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showAnswers, setShowAnswers] = useState(true);
  const [currentAnswerId, setcurrentAnswerId] = useState("");
  const [isCommentWindowVisible, setCommentWindowVisible] = useState(false);
  const ipv4Address = process.env.API_HOST;

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
      answerId,
      answerOwner,
      parentAnswer,
      parentThread
    );
    console.log("Kommentar hinzugefügt", parentAnswer, parentThread);
    closeCommentWindow();
  };

  async function addAnswerToObject(
    commentText,
    answerId,
    newAnswerOwner,
    parentAnswer,
    parentThread
  ) {
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
        answerOwner: "651ab2ac507701e42608db16",
        parentAnswer: parentAnswer,
        parentThread: parentThread,
      },
    };
    console.log(reqData);
    await axios.request(reqData);
  }
  const handleLike = () => {
    console.log("Es wurde geliket");
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    console.log("Es wurde gedisliket");
    setDislikeCount(dislikeCount + 1);
  };

  const handleSuperlike = () => {
    console.log("Es wurde gesuperliket");
  };

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
        {/* Interaktionscontainer */}
        <View style={styles.interactionContainer}>
          <View style={styles.interactionButtonContainer}>
            <InteractionButton label="Like" type="like" onPress={handleLike} />
            <Text>{likeCount}</Text>
          </View>
          <View style={styles.interactionButtonContainer}>
            <Text>{dislikeCount}</Text>
            <InteractionButton
              label="Dislike"
              type="dislike"
              onPress={handleDislike}
            />
          </View>
          <View style={styles.interactionButtonContainer}>
            <InteractionButton
              label="Superlike"
              type="superlike"
              onPress={handleSuperlike}
            />
          </View>
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
