import { StyleSheet, View, } from 'react-native'; // Importieren Sie CheckBox von react-native
import Background from '../components/Background';
import Question from '../components/Question';
import HeaderText from '../components/HeaderText';
import Text from '../components/Text';


const ArchivPage = ({ navigation }) => {
  return (
    <Background showFooter={true} showBurgerBun={true}>
      <View style={styles.outerBox}>
      <HeaderText title="Archiv" type="left" />

      <Text title="Hier findest du eine Übersicht über deine archivierten Fragen" type="left" />
      <Question subject="Mathematik" user="UserXY" question="Wie löse ich diese Aufgabe?" />
      <Question subject="Informatik" user="UserXY" question="Wie löse ich diese Aufgabe?" />

      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
  },
});

export { ArchivPage };
