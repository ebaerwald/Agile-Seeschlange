import React, { useState } from "react";
import SnakeImage from "../components/SnakeImage";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderText from "../components/HeaderText";
import Background from "../components/Background";
import { useTheme } from "../hooks/useTheme";

export function FaqPage() {
  const { imp } = useContext(ImpContext);

  useEffect(() => {
    if (!imp.userStore._id) {
      navigation.navigate("Login");
    }
  }, []);

  const [isTextExpanded, setTextExpanded] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [currentAppColorScheme, setCurrentAppColorScheme] = useState("auto");
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);

  const questions = [
    "Gibt es einen Darkmode?",
    "Wie sieht es mit dem Datenschutz aus?",
    "Warum Seeschlange?",
    "Wann kommen neue Features?",
    "Wie kann ich Freunde einladen?",
  ];

  const answers = [
    "Aber natürlich gibt es einen Darkmode. Um diesen zu aktivieren gehe einfach in die Einstellung und Aktiviere den ‘TiefseeModus’.",
    "Kritische Sache frag lieber mal Sascha",
    "Hat Herr Paar ins Leben gerufen",
    "Nach dem 5. Semester wahrscheinlich nie wieder",
    "Hast du überhaupt welche?",
  ];

  const toggleTextExpansion = (index) => {
    const updatedExpansionState = [...isTextExpanded];
    updatedExpansionState[index] = !updatedExpansionState[index];
    setTextExpanded(updatedExpansionState);
  };

  return (
    <Background>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <SnakeImage />
          </View>
          <HeaderText title="FAQ" type="center" />
          <View style={styles.faqItemContainer}>
            {questions.map((question, index) => (
              <View
                key={index}
                style={[
                  styles.centeredFaqItem,
                  {
                    borderTopLeftRadius: index === 0 ? 10 : 0,
                    borderTopRightRadius: index === 0 ? 10 : 0,
                    borderBottomLeftRadius:
                      index === questions.length - 1 ? 10 : 0,
                    borderBottomRightRadius:
                      index === questions.length - 1 ? 10 : 0,
                  },
                ]}
              >
                <View style={styles.questionContainer}>
                  <Text style={styles.faqQuestion}>{question}</Text>
                  <TouchableOpacity onPress={() => toggleTextExpansion(index)}>
                    <Text style={styles.toggleButton}>
                      {isTextExpanded[index] ? "▲" : "▼"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {isTextExpanded[index] && (
                  <Text style={styles.faqAnswer}>{answers[index]}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: currentTheme.backgroundColor,
    },
    faqItemContainer: {
      width: "95%",
    },
    centeredFaqItem: {
      flexDirection: "column",
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      backgroundColor: "#72C770",
    },
    questionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    faqQuestion: {
      fontSize: 18,
      fontWeight: "bold",
    },
    faqAnswer: {
      fontSize: 16,
      marginTop: 5,
      backgroundColor: "#a4ea7a",
      padding: 10,
      borderRadius: 5,
    },
    toggleButton: {
      color: "black",
      fontSize: 16,
    },
  });

export default FaqPage;
