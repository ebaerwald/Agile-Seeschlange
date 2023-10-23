import * as user from "../impressive-store/user";
import * as answer from "../impressive-store/answer";
// import * as auth from "../impressive-store/auth";
import * as question from "../impressive-store/question";
import * as group from "../impressive-store/group";
import { impContext } from "../impressive-store/provider";

import { useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import Background from '../components/Background';

const TestBackendPage = ({ navigation }) => {

    const { imp } = useContext(impContext);
    useEffect(() => {
        console.log(imp)
    }, [imp]);
    

    return (
      <ScrollView>
        <Background showFooter={true} showBurgerBun={true}>
          <View style={styles.outerBox}>
            <Text>{imp.userStore.username}</Text>
            <Button
              title="Test"
              onPress={() => {
                imp.set.userStore({
                  ...imp.userStore,
                  username: "Test",
                })
              }}
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