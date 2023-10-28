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

const MenuePage = ({ navigation }) => {
  const { imp } = useContext(impContext);

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

          <Button
            text="Was gibts gerade für Fragen?"
            iconType="newQuestion"
            onPress={async() => {
              question.getQuestions(imp);
              }
            }
          /> 

          <SubHeaderText title="Meine Fragen" type="left" />
          <Question
            subject="Mathematik"
            user="UserXY"
            question="Wie löse ich diese Aufgabe?"
            navigation={navigation}
          />
          <SubHeaderText title="Favorisierte Fragen" type="left" />
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
});

export { MenuePage };
