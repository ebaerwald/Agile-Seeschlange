import * as user from "../impressive-store/user";
import { impContext } from "../impressive-store/provider";

import { useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import Background from '../components/Background';

const TestBackendPage = () => {

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
            <Button
              title="Create User"
              onPress={async() => {
                console.log("Fick dich")
                const response = await user.createUser(imp, {
                  "object": {
                  "email": 'test@testuser.de',
                  "name": 'Test',
                  "lastName": 'User',
                  "googleUserId": '1234567890',
                  }
                });
                console.log(response);
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