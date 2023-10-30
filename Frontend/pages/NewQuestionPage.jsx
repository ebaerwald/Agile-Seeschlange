import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native"; // Importieren Sie CheckBox von react-native
import Button from "../components/Button";
import DataInputField from "../components/DataInputField";
import SnakeImage from "../components/SnakeImage";
import Background from "../components/Background";
import CustomCheckbox from "../components/Checkbox"; // Importieren Sie die CustomCheckbox-Komponente
import HeaderText from "../components/HeaderText";
import Text from "../components/Text";
import Question from "../components/Question";
import * as question from "../impressive-store/question";
import { useEffect, useContext } from "react";
import { impContext } from "../impressive-store/provider";
import ImageViewer from "../components/ImageViewer";
import * as ImagePicker from "expo-image-picker";

const NewQuestionPage = ({ navigation }) => {
  const { imp } = useContext(impContext);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [UserRightsChecked, setUserRightsChecked] = useState(false); // Zustand für die AGB-Checkbox

  // KameraFeature
  const PlaceholderImage = require("../assets/IMG_0517.png");
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleAnswerButtonClick = async () => {
    if (!UserRightsChecked) {
      alert("Bitte stimme unseren Bestimmungen zu.");
    } else {
      const res = await question.createQuestion(imp, {
        title: title,
        text: text,
        image: selectedImage,
      });
      console.log(res);
      //console.log(imp)
      navigation.navigate("Menue");
    }
  };

  return (
    <ScrollView>
      <Background>
        {/* Inhalt der Seite */}
        <View style={styles.outerBox}>
          <SnakeImage size="small" />

          <HeaderText title="Deine Frage" type="center" />

          <View style={styles.QuestionContainer}>
            <Text
              title="Gib das Fach an, zu dem du eine Frage hast:"
              type="center"
            />
            <View style={styles.fragenContainer}>
              <DataInputField
                placeholder="Fach*"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <Text title="Tippe hier deine Frage ein:" type="center" />
            <View style={styles.fragenContainer}>
              <DataInputField
                placeholder="Deine Frage*"
                value={text}
                onChangeText={(text) => setText(text)}
              />
            </View>
            <Button
              onPress={pickImage}
              iconType=""
              text="Anstelle eines Textes, kannst du auch ein Foto deiner Frage hochladenn"
            />
            <View style={styles.imageContainer}>
              {selectedImage ? (
                <ImageViewer
                  placeholderImageSource={PlaceholderImage}
                  selectedImage={selectedImage}
                />
              ) : null}
            </View>
          </View>
          <CustomCheckbox
            label="Hiermit stimme ich zu, dass meine Frage im Meer veröffentlich wird*"
            value={UserRightsChecked}
            onValueChange={(value) => setUserRightsChecked(value)}
          />
          <Text
            title="Alle mit * markierten Felder sind Pflichtfelder. Bitte fülle sie aus."
            type="center"
          />

          {/* Registrieren-Button */}
          <Button
            onPress={handleAnswerButtonClick}
            iconType="Answer"
            text="Frage im Meer stellen!"
          />
        </View>
      </Background>
    </ScrollView>
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
    color: "black",
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
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
});

export { NewQuestionPage };
