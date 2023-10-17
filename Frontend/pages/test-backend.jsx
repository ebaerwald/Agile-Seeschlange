import * as user from "../impressive-store/user";
import * as answer from "../impressive-store/answer";
import * as auth from "../impressive-store/auth";
import * as question from "../impressive-store/question";
import * as comment from "../impressive-store/comment";
import * as group from "../impressive-store/group";
import { impContext } from "../impressive-store/provider";

import { useEffect } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import Background from '../components/Background';
import Question from '../components/Question';
import Searchbar from '../components/Searchbar.js';
import HeaderText from '../components/HeaderText';
import SubHeaderText from '../components/SubHeaderText';
import Button from '../components/Button';

const TestBackendPage = ({ navigation }) => {

    const { imp } = useContext(impContext);
    useEffect(() => {
        console.log(imp);
    }, [imp]);

    return (
      <ScrollView>
        <Background showFooter={true} showBurgerBun={true}>
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
              iconType="newQuestion" // Hier setzen wir den Typ auf "newQuestion"
              onPress={() => {
                // Hier kannst du die Aktion hinzufügen, die beim Klicken auf den Button ausgeführt werden soll
                navigation.navigate('NewQuestion');
            }}/>
  
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
    },
  });
  
  export { TestBackendPage };