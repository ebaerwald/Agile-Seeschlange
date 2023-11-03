import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Answer from "../components/Answer";
import InteractionButton from "../components/InteractionButton";
import DataInputField from "../components/DataInputField";
import axios from "axios";
import { impContext } from "../impressive-store/provider.jsx";
import config from "../config.js";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setCurrThreadId,
  setCurrLoading,
} from "../features/Threads/currentThreadSlice.jsx";
import { useEffect, useContext } from "react";

const Question = ({
  subject,
  user,
  question,
  navigation,
  newQuestion,
  questionId,
  answers,
}) => {
  const { imp } = useContext(impContext);

  const dispatch = useDispatch();
  const { currLoading, currThreadId } = useSelector(
    (state) => state.currThreads
  );
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [superlikeCount, setSuperlikeCount] = useState(0);
  const [showAnswers, setShowAnswers] = useState(true);
  const [fach, setFach] = useState("");
  const [answer, setAnswer] = useState("");
  const [interactionButtonTypeStar, setInteractionButtonTypeStar] =
    useState("star");
  const [interactionButtonTypeSuperlike, setInteractionButtonTypeSuperlike] =
    useState("superlike");

  const handleLike = () => {
    console.log("Button Like wurde geklickt");
    sendLikeRequest(imp.userStore._id, questionId);
  };
  async function sendLikeRequest(userId, questionId) {
    const reqData = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `http://${config.serverIP}:3001/api/thread/like/${questionId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userId,
      },
    };
    console.log(reqData);
    const res = await axios.request(reqData);
    // console.log(res.data);
  }
  async function sendDislikeRequest(userId, threadId) {
    const reqData = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `http://${config.serverIP}:3001/api/thread/dislike/${threadId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userId,
      },
    };
    console.log(reqData);
    const res = await axios.request(reqData);
    // console.log(res.data);
  }

  const handleDislike = () => {
    console.log("Button Dislike wurde geklickt");
    sendDislikeRequest(imp.userStore._id, questionId);
  };

  const handleSuperlike = () => {
    if (interactionButtonTypeSuperlike === "superlike") {
      setInteractionButtonTypeSuperlike("superlikePushed");
    } else {
      setInteractionButtonTypeSuperlike("superlike");
    }
    console.log("Superlike wurde geklickt");
  };

  const handleShortPress = () => {
    if (!newQuestion) {
      dispatch(setCurrThreadId(questionId));

      navigation.navigate("SingleQuestion");
    } else console.log("Es ist eine neue Frage und hat keine Antworten");
  };

  return (
    <TouchableOpacity
      style={styles.QuestionContainer}
      onPress={handleShortPress}
    >
      {/* Container für allgemeine Infos der Frage, wie z. B. welches Fach und welcher Benutzer gefragt hat */}
      <View style={styles.generalInfoContainer}>
        <View style={styles.userContainer}>
          {!newQuestion ? (
            <Text>{`${user} fragt im Fach`} </Text>
          ) : (
            <Text>Du fragst im Fach: </Text>
          )}
        </View>
        <View style={styles.fachContainer}>
          {!newQuestion ? (
            <Text>{subject}</Text>
          ) : (
            <DataInputField
              placeholder="Dein Fach*"
              value={fach}
              onChangeText={(text) => setFach(text)}
              type="Question"
            />
          )}
        </View>
      </View>

      <View style={styles.fragenContainer}>
        {!newQuestion ? (
          <Text style={styles.text}>{question}</Text>
        ) : (
          <DataInputField
            placeholder="Formuliere deine Frage möglichst präzise*"
            value={answer}
            onChangeText={(text) => setAnswer(text)}
            type="Answer"
          />
        )}
      </View>

      {/* Interaktionscontainer für Frage */}
      {!newQuestion && (
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
              type={interactionButtonTypeSuperlike}
              onPress={handleSuperlike}
            />
          </View>
        </View>
      )}
      <View style={styles.MenueContainer}>
        {/* Button zum Anzeigen/Ausblenden von Antworten */}
        {!newQuestion && (
          <TouchableOpacity
            style={styles.showAnswersButton}
            //onPress={}
          ></TouchableOpacity>
        )}
        {/* Antworten anzeigen, wenn showAnswers true ist */}
        {answers && (
          <View>
            {/* Hier die Antworten anzeigen */}
            {answers.map((answer, index) => (
              <Answer
                key={index}
                user={answer.answerOwner}
                answer={answer.text}
                answers={answer.answers}
                newShowAnswers={showAnswers}
                marginOffset={20}
              />
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  QuestionContainer: {
    backgroundColor: "#72c770",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    borderWidth: 1,
  },
  generalInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 5,
  },
  userContainer: {
    alignItems: "center",
    padding: 5,
    backgroundColor: "#72c770",
    justifyContent: "left",
  },
  fachContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#a4ea7a",
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
  },
  fragenContainer: {
    marginBottom: 5,
    backgroundColor: "#a4ea7a",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderBottomWidth: 1, // Breite der Linie
    borderBottomColor: "black", // Farbe der Linie
    borderBottomStyle: "dashed", // Stil der Linie (gestrichelt)
    padding: 10, // Platzierung des Inhalts
  },
  interactionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  interactionButton: {
    backgroundColor: "#a4ea7a",
    padding: 2,
    borderRadius: 1,
  },
  likeCountContainer: {
    backgroundColor: "#a4ea7a",
    padding: 5,
    borderRadius: 1,
    marginLeft: 5,
  },
  MenueContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  solveButton: {
    alignItems: "center",
    backgroundColor: "#a4ea7a",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Question;
