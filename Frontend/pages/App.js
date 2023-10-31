import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "./components/ThemeContext";
import { createStackNavigator } from "@react-navigation/stack";


// Importe Seiten
import {
  FrontendTestScreen,
  LoginPage,
  SplashScreen,
  RegisterPage,
  MenuePage,
  ArchivPage,
  SettingsPage,
  AussehenPage,
  NotificationsPage,
  KontoPage,
  MemoryDataPage,
  FaqPage,
  TestBackendPage,
  SingleQuestionPage,
  NewQuestionPage,
} from "./pages";

// Importe Impressive Store:
/*
import { ImpProvider } from "./impressive-store/provider";
import {
  answerStore,
  answersStore,
  groupStore,
  groupsStore,
  questionStore,
  questionsStore,
  tagStore,
  tagsStore,
  userStore,
  usersStore,
} from "./impressive-store";
*/



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SettingStack = createStackNavigator();
const FrontendStack = createStackNavigator();


const FrontendTestNavigator = () => {
  return (
    <FrontendStack.Navigator>
      <FrontendStack.Screen name="FrontendTestScreen" component={FrontendTestScreen} />
      <FrontendStack.Screen name="LoginPage" component={LoginPage} />
      <FrontendStack.Screen name="SplashScreen" component={SplashScreen} />
      <FrontendStack.Screen name="RegisterPage" component={RegisterPage} />
      <FrontendStack.Screen name="ArchivPage" component={ArchivPage} />
      <FrontendStack.Screen name="FaqPage" component={FaqPage} />
      <FrontendStack.Screen name="SingleQuestion" component={SingleQuestionPage} />
      <FrontendStack.Screen name="NewQuestion" component={NewQuestionPage} />
    </FrontendStack.Navigator>
  );
}


const SettingNavigator = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Einstellungen" component={SettingsPage} />
      <SettingStack.Screen name="AussehenPage" component={AussehenPage} />
      <SettingStack.Screen name="NotificationsPage" component={NotificationsPage} />
      <SettingStack.Screen name="KontoPage" component={KontoPage} />
      <SettingStack.Screen name="MemoryDataPage" component={MemoryDataPage} />
      <SettingStack.Screen name="Splash" component={SplashScreen} />
    </SettingStack.Navigator>
  );
}

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Menue"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Menue") {
          iconName = focused ? "Menue-outline" : "Menue";
        } else if (route.name === "Einstellungen") {
          iconName = focused ? "settings-outline" : "settings";
        } else if (route.name === "Groups") {
          iconName = focused ? "people-outline" : "people";
        } else if (route.name === "Explore") {
          iconName = focused ? "eye-outline" : "eye";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#72C770",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Menue" component={MenuePage} />
    <Tab.Screen name="Groups" component={SettingNavigator} />
    <Tab.Screen name="Explore" component={ArchivPage} />
    <Tab.Screen name="Einstellungen" component={FrontendTestNavigator} />
    <Tab.Screen name="TestBackend" component={TestBackendPage} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="SettingNavigator" component={SettingNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;