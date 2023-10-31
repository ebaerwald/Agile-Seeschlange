import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FrontendTestScreen } from "./pages/FrontendTestScreen";
import { LoginPage } from "./pages/LoginPage";
import { SplashScreen } from "./pages/SplashScreen";
import { RegisterPage } from "./pages/RegisterPage";
import { MenuePage } from "./pages/MenuePage";
import { LawPage } from "./pages/LawPage";
import { ArchivPage } from "./pages/ArchivPage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SettingsPage } from "./pages/SettingsPage";
import { AussehenPage } from "./pages/AussehenPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { KontoPage } from "./pages/KontoPage";
import { MemoryDataPage } from "./pages/MemoryDataPage";
import FaqPage from "./pages/FaqPage";
import { useTheme, ThemeProvider } from "./components/ThemeContext";
import { TestBackendPage } from "./pages/test-backend";
import { SingleQuestionPage } from "./pages/SingleQuestionPage";
import { NewQuestionPage } from "./pages/NewQuestionPage";
import { useState } from "react";


//+++++*Redux Store++++++
import { Provider } from "react-redux";
import store from "./store";
//-----------------------

//Impressive Store
import { ImpProvider } from "./impressive-store/provider";
import { answerStore, answersStore } from "./impressive-store/answer";
import { tagStore, tagsStore } from "./impressive-store/tag";
import { groupStore, groupsStore } from "./impressive-store/group";
import { questionStore, questionsStore } from "./impressive-store/question";
import { userStore, usersStore } from "./impressive-store/user";
// ----------------------

export default function App() {
  const EinstellungenStack = createStackNavigator();
  const FrontendTestStack = createStackNavigator();
  const QuestionStack = createStackNavigator();

  function EinstellungenStackScreen() {
    return (
      <EinstellungenStack.Navigator
      initialRouteName="Setting"
        screenOptions={{ headerShown: false }}
      >
        {/* Login und RegisterRoutem */}
        <EinstellungenStack.Screen name="Splash" component={SplashScreen} />        
        <FrontendTestStack.Screen name="LoginPage" component={LoginPage} />
        <FrontendTestStack.Screen name="RegisterPage" component={RegisterPage} />

        {/* Routen rund um die Einstellungen und um das Konto */}
        <EinstellungenStack.Screen name="Setting" component={SettingsPage} />   
        <EinstellungenStack.Screen name="AussehenPage" component={AussehenPage} />
        <EinstellungenStack.Screen name="NotificationsPage" component={NotificationsPage} />
        <EinstellungenStack.Screen name="KontoPage" component={KontoPage} />
        <EinstellungenStack.Screen name="Archiv" component={ArchivPage} />
        <EinstellungenStack.Screen name="Law" component={LawPage} />
        <EinstellungenStack.Screen name="FAQ" component={FaqPage} />

        {/* Routen zum Testen und sonstiger Müll, der noch gelöscht werden müsste */}
        <EinstellungenStack.Screen name="TestImpStoreBackend" component={TestBackendPage} />

      </EinstellungenStack.Navigator>
    );
  }

  function QuestionStackScreen() {
    return (
      <QuestionStack.Navigator

        screenOptions={{ headerShown: false }}
      >              
        <QuestionStack.Screen name="Home" component={MenuePage} />
        <QuestionStack.Screen name="SingleQuestion" component={SingleQuestionPage} />
        <QuestionStack.Screen name="Neue Frage posten" component={NewQuestionPage} />

      </QuestionStack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  const initialStore = {
    usersStore: usersStore,
    userStore: userStore,
    groupsStore: groupsStore,
    groupStore: groupStore,
    questionsStore: questionsStore,
    questionStore: questionStore,
    answersStore: answersStore,
    answerStore: answerStore,
    tagStore: tagStore,
    tagsStore: tagsStore,
  };

  return (
    <Provider store={store}>
      <ImpProvider store={initialStore}>
        <ThemeProvider>
          <NavigationContainer>
            <Tab.Navigator
            initialRouteName={true ? "Home" : "Splash"}
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Home") {
                    iconName = focused ? "home-outline" : "home";
                  } else if (route.name === "Einstellungen") {
                    iconName = focused ? "settings-outline" : "settings";
                  } else if (route.name === "Groups") {
                    iconName = focused ? "people-outline" : "people";
                  } else if (route.name === "Explore") {
                    iconName = focused ? "eye-outline" : "eye";
                  } else if (route.name === "Neue Frage posten") {
                    iconName= focused ? "help-circle-outline" : "help-circle";
                  } else if (route.name === "Neue Frage posten") {
                    iconName= focused ? "return-up-back-outline" : "help-circle";
                  }

                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#72C770",
                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen name="Home" component={QuestionStackScreen} />
              <Tab.Screen name="Splash" component={SplashScreen} />
              <Tab.Screen name="Neue Frage posten" component={NewQuestionPage} />
              <Tab.Screen name="Einstellungen" component={EinstellungenStackScreen} />

          </Tab.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </ImpProvider>
    </Provider>
  );
}
