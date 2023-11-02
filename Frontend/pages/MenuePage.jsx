import { StyleSheet, View, ScrollView } from "react-native";
import Background from "../components/Background";
import Question from "../components/Question";
import Searchbar from "../components/Searchbar.js";
import HeaderText from "../components/HeaderText";
import SubHeaderText from "../components/SubHeaderText";
import Button from "../components/Button";
import * as question from "../impressive-store/question";
import * as answer from "../impressive-store/answer";
import { impContext } from "../impressive-store/provider";
import { useEffect, useContext } from "react";
import config from "../config";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setThreads, setLoading } from "../features/Threads/threadsSlice";
import {
  setFavThreads,
  setFavLoading,
} from "../features/Threads/favoriteThreadsSlice";
import axios from "axios";

import { FlatList, Text } from "react-native";

const MenuePage = ({ navigation }) => {
  const { imp } = useContext(impContext);
  const { threads, loading } = useSelector((state) => state.threads);
  const { favLoading, favThreads } = useSelector((state) => state.favThreads);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("imp store Menue Page: " + JSON.stringify(imp.userStore));
    if (!imp.userStore._id) {
      navigation.navigate("Login");
    }
    reloadThreads();
    reloadFavThreads(imp.userStore._id);
  }, []);

  async function reloadThreads() {
    dispatch(setLoading(true));
    const reqData = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `http://${config.serverIP}:3001/api/threads`,
    };
    const { data } = await axios.request(reqData);
    console.log(data);
    dispatch(setThreads(data));
    dispatch(setLoading(false));
  }
  async function reloadFavThreads(userId) {
    dispatch(setFavLoading(true));
    const reqData = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `http://${config.serverIP}:3001/api/user/favoritequestion/653644ae7340265526764d5c`, //TODO Take User id from store and put there instead of 653644...
    };
    const { data: data2 } = await axios.request(reqData);
    console.log(data2);
    dispatch(setFavThreads(data2));
    dispatch(setFavLoading(false));
  }

  return (
    <Background>
      <ScrollView>
        <View style={styles.outerBox}>
          <HeaderText title="Menue" type="left" />
          <Searchbar
            onChangeText={(newText) => {
              console.log("Suchtext:", newText);
            }}
            placeholder="Suche..."
          />

          <Button
            text="Ich will eine neue Frage posten"
            iconType="newQuestion"
            onPress={() => {
              navigation.navigate("NewQuestion");
            }}
          />

          <SubHeaderText title="Aktuelle Fragen" type="left" />

          <View style={styles.QuestionContainer}>
            {!loading && threads && (
              <FlatList
                data={threads}
                renderItem={({ item }) => (
                  <View style={styles.fragenContainer}>
                    <Question
                      subject={item.title}
                      user={item.title}
                      question={item.text}
                      navigation={navigation}
                      questionId={item._id}
                    />
                  </View>
                )}
              />
            )}
          </View>

          <SubHeaderText title="Meine Favorisierte Fragen" type="left" />
          <View style={styles.QuestionContainer}>
            {!favLoading && favThreads && (
              <FlatList
                data={favThreads}
                renderItem={({ item }) => (
                  <View style={styles.fragenContainer}>
                    <Question
                      subject={item.title}
                      user={item.title}
                      question={item.text}
                      navigation={navigation}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 2,
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
  fragenContainer: {
    marginBottom: 5,
    backgroundColor: "#a4ea7a",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { MenuePage };
