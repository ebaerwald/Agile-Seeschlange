import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Answer from "../components/Answer";
import DataInputField from "../components/DataInputField";
import { impContext } from "../impressive-store/provider.jsx";
import { useDispatch } from "react-redux";
import { setCurrThreadId } from "../features/Threads/currentThreadSlice.jsx";
import { useContext } from "react";

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
  const [showAnswers] = useState(true);
  const [fach, setFach] = useState("");
  const [answer, setAnswer] = useState("");

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
      <View style={styles.MenueContainer}>
        {!newQuestion && (
          <TouchableOpacity
            style={styles.showAnswersButton}
          ></TouchableOpacity>
        )}
        {answers && (
          <View>
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
    borderBottomWidth: 1, 
    borderBottomColor: "black", 
    borderBottomStyle: "dashed",
    padding: 10, 
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
