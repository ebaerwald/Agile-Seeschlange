import { StyleSheet, View, ScrollView, Text } from "react-native"; // Importieren Sie CheckBox von react-native
import Background from "../components/Background";
import Question from "../components/Question";
import HeaderText from "../components/HeaderText";
import { useTheme } from "../hooks/useTheme";
import { useThemeContext } from "../components/ThemeContext";

const ArchivPage = ({ navigation }) => {
  const { imp } = useContext(ImpContext);

  useEffect(() => {
    if (!imp.userStore.id) {
      navigation.navigate('Login');
    }
  }, []);
  const { currentAppColorScheme, setCurrentAppColorScheme } = useThemeContext();
  const currentTheme = useTheme({ currentAppColorScheme });
  const styles = themedStyle(currentTheme);
  return (
    <Background>
      <ScrollView>
        <View style={styles.outerBox}>
          <HeaderText title="Archiv" type="left" />
          <Text style={styles.textt}>
            Hier findest du eine Übersicht über deine archivierten Fragen
          </Text>
          <Question
            subject="Mathematik"
            user="UserXY"
            question="Wie löse ich diese Aufgabe?"
          />
          <Question
            subject="Informatik"
            user="UserXY"
            question="Wie löse ich diese Aufgabe?"
          />
        </View>
      </ScrollView>
    </Background>
  );
};

const themedStyle = (currentTheme) =>
  StyleSheet.create({
    outerBox: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: 2,
      marginTop: 50,
    },
    textt: {
      color: currentTheme.textColor,
    },
  });

export { ArchivPage };
