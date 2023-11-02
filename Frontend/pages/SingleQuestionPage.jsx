import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native"; // Importieren Sie CheckBox von react-native
import Button from "../components/Button";
import DataInputField from "../components/DataInputField";
import SnakeImage from "../components/SnakeImage";
import Background from "../components/Background";
import CustomCheckbox from "../components/Checkbox"; // Importieren Sie die CustomCheckbox-Komponente
import HeaderText from "../components/HeaderText";
import Text from "../components/Text";
import SingleQuestion from "../components/SingleQuestion";
import config from "../config";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setCurrThreadId,
  setCurrLoading,
} from "../features/Threads/currentThreadSlice.jsx";
import axios from "axios";

//Imp-Store Questions
import { impContext } from "../impressive-store/provider";
import * as question from "../impressive-store/question";
import { useEffect, useContext } from "react";

const SingleQuestionPage = ({ navigation }) => {
  const ip = config.serverIP;
  const dispatch = useDispatch();
  const { currLoading, currThreadId } = useSelector(
    (state) => state.currThreads
  );
  const [giveAnswer, setAnswer] = useState("");
  const [UserRightsChecked, setUserRightsChecked] = useState(false);
  const [currentThreadWithAnswers, setCurrentThreadWithAnswers] =
    useState(false);

  const { imp } = useContext(impContext);
  useEffect(() => {
    reloadCurrThread(currThreadId);
  }, [currThreadId]);

  useEffect(() => {
    console.log("Imp.Store " + JSON.stringify(imp.userStore));
    if (!imp.userStore._id) {
      navigation.navigate("Login");
    }
  }, []);

  async function reloadCurrThread(currThreadId) {
    const reqData = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `http://${ip}:3001/api/thread/${currThreadId}`,
    };
    const { data } = await axios.request(reqData);
    setCurrentThreadWithAnswers(data);
    dispatch(setCurrLoading(false));
  }
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
        answerOwner: newAnswerOwner,
        parentAnswer: parentAnswer,
        parentThread: parentThread,
      },
    };
    console.log(reqData);
    await axios.request(reqData);
  }
  const handleAnswerButtonClick = (
    commentText,
    answerId,
    newAnswerOwner,
    parentAnswer,
    parentThread
  ) => {
    // Hier Logik für den Antwortgeben-Button
    console.log("AGB akzeptiert:", UserRightsChecked);
    addAnswerToObject(
      commentText,
      answerId,
      newAnswerOwner,
      parentAnswer,
      parentThread
    );
    //navigation.navigate('Menue');
  };

  return (
    <Background>
      <ScrollView>
        {/* Inhalt der Seite */}
        <View style={styles.outerBox}>
          <SnakeImage size="small" />
          <HeaderText title="Die Frage" type="center" />
          {!currLoading && currentThreadWithAnswers && (
            <>
              <SingleQuestion
                subject={currentThreadWithAnswers.title}
                user={currentThreadWithAnswers.title}
                question={currentThreadWithAnswers.text}
                showAnswers={true}
                answers={currentThreadWithAnswers.answers}
                image={currentThreadWithAnswers.image}
              />
              <Text
                title="Eine Seeschlange hat diese Frage gepostet und braucht Deine Hilfe. Du weißt eine Antwort? Super! Poste deine Antwort und hilf anderen Seeschlangen!"
                type="center"
              />
            </>
          )}

          <DataInputField
            placeholder="Deine Antwort*"
            value={giveAnswer}
            onChangeText={(text) => setAnswer(text)}
          />

          {/*SMH Fragt: Kann der Button nicht raus?

          <Button
            title="Get Question"
            onPress={async () => {
              try {
                const res = await question.getQuestion(
                  imp,
                  "5f9e9b3b9b7b7b0b3c3c3c3c"
                );
                console.log(res);
              } catch (error) {
                console.error("Fehler beim Abrufen der Frage:", error);
              }
            }}
          />
          */}

          <CustomCheckbox
            label="Hiermit stimme ich zu, dass meine Antwort veröffentlich wird*"
            value={UserRightsChecked}
            onValueChange={(value) => setUserRightsChecked(value)}
          />
          <Text
            title="Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus."
            type="center"
          />

          <Button
            onPress={handleAnswerButtonClick(
              giveAnswer,
              null,
              imp.userStore._id,
              "",
              currThreadId
            )}
            iconType="Answer"
            text="Antwort im Meer senden!"
          />
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
});

export { SingleQuestionPage };
