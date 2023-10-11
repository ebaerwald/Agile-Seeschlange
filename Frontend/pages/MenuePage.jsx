import { StyleSheet, View, } from 'react-native'; // Importieren Sie CheckBox von react-native
import Background from '../components/Background';
import Question from '../components/Question';
import Searchbar from '../components/Searchbar.js'; // Passe den Pfad entsprechend an
import HeaderText from '../components/HeaderText';
import SubHeaderText from '../components/SubHeaderText';

const MenuePage = ({ navigation }) => {


  return (
    <Background showFooter={true} showBurgerBun={true}>
      <View style={styles.outerBox}>
      <HeaderText title="Home" type="left" />

      <Searchbar
        onChangeText={(newText) => {
          // Hier kannst du die Suche durchführen oder den Text speichern
          console.log('Suchtext:', newText);
        }}
        placeholder="Suche..."
      />

      <SubHeaderText title="Meine Fragen" type="left" />

      <Question subject="Mathematik" user="UserXY" question="Wie löse ich diese Aufgabe?" />
      <Question subject="Informatik" user="UserXY" question="Wie löse ich diese Aufgabe?" />

      <SubHeaderText title="Favorisierte Fragen" type="left" />
      <Question subject="Mathematik" user="UserXY" question="Wie löse ich diese Aufgabe?" />

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

export { MenuePage };
