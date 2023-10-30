import { StyleSheet, View, ScrollView } from 'react-native';
import Background from '../components/Background';
import Question from '../components/Question';
import Searchbar from '../components/Searchbar.js';
import HeaderText from '../components/HeaderText';
import SubHeaderText from '../components/SubHeaderText';
import Button from '../components/Button';
import * as question from "../impressive-store/question";
import * as answer from "../impressive-store/answer";
import { impContext } from "../impressive-store/provider";
import { useEffect, useContext } from "react";
import Text from '../components/Text';


const MenuePage = ({ navigation }) => {
  const { imp } = useContext(impContext);
  //useEffect(() => {
    //question.getQuestions(imp);

// }, [imp]);

  return (
    <ScrollView>
      <Background>
        <View style={styles.outerBox}>
          <HeaderText title="Home" type="left" />
          <Searchbar
            onChangeText={(newText) => {
            console.log('Suchtext:', newText);
            }}
            placeholder="Suche..."
          />

          <Button
            text="Ich will eine neue Frage posten"
            iconType="newQuestion" 
            onPress={() => {
            navigation.navigate('NewQuestion');
          }}/>

          <SubHeaderText title="Aktuelle Fragen" type="left" />


          <View style={styles.QuestionContainer}>
            <View style={styles.fragenContainer}>



            </View>
          </View>



          <SubHeaderText title="Meine Favorisierte Fragen" type="left" />
          <Question
            subject="Mathematik"
            user="UserXY"
            question="Wie löse ich diese Aufgabe?"
            navigation={navigation}
          />
        </View>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
    marginTop: 50,
  },
  QuestionContainer: {
    backgroundColor: '#72c770',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
  },
  fragenContainer: {
    marginBottom: 5,
    backgroundColor: '#a4ea7a',
    padding: 10,
    borderRadius: 5,
    marginTop: 5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { MenuePage };
