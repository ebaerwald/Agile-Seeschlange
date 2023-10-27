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
import { ArchivPage } from "./pages/ArchivPage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SettingsPage } from "./pages/SettingsPage";
import { AussehenPage } from "./pages/AussehenPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { KontoPage } from "./pages/KontoPage";
import { MemoryDataPage } from "./pages/MemoryDataPage";
import FaqPage from "./pages/FaqPage";
import { useTheme, ThemeProvider } from './components/ThemeContext';
import { TestBackendPage } from "./pages/test-backend";
import { SingleQuestionPage } from "./pages/SingleQuestionPage";
import { NewQuestionPage } from "./pages/NewQuestionPage";
import { useState } from 'react'; 

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

  function EinstellungenStackScreen() {
    return (
      <EinstellungenStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <EinstellungenStack.Screen
          name="Einstellungen"
          component={SettingsPage}
        />
        <EinstellungenStack.Screen
          name="AussehenPage"
          component={AussehenPage}
        />
        <EinstellungenStack.Screen
          name="NotificationsPage"
          component={NotificationsPage}
        />
        <EinstellungenStack.Screen name="KontoPage" component={KontoPage} />
        <EinstellungenStack.Screen
          name="MemoryDataPage"
          component={MemoryDataPage}
        />
      </EinstellungenStack.Navigator>
    );
  }

  function FrontendTestStackScreen() {
    return (
      <FrontendTestStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <FrontendTestStack.Screen name={"FrontendTestScreen"} component={FrontendTestScreen}/>
        <FrontendTestStack.Screen name={"LoginPage"} component={LoginPage} />
        <FrontendTestStack.Screen name={"SplashScreen"} component={SplashScreen} />
        <FrontendTestStack.Screen name={"RegisterPage"} component={RegisterPage} />
        <FrontendTestStack.Screen name={"MenuePage"} component={MenuePage} />
        <FrontendTestStack.Screen name={"ArchivPage"} component={ArchivPage} />
        <FrontendTestStack.Screen name={"FaqPage"} component={FaqPage} />
        
      </FrontendTestStack.Navigator>
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
    tagsStore: tagsStore
  };
  return (
    <ImpProvider store={initialStore}>
    <ThemeProvider>
    <NavigationContainer>
      <Tab.Navigator
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
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#72C770",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={MenuePage} />
        <Tab.Screen name="Groups" component={FrontendTestStackScreen} />
        <Tab.Screen name="Explore" component={ArchivPage} />
        <Tab.Screen name="Einstellungen" component={EinstellungenStackScreen} />
        <Tab.Screen name="TestBackend" component={TestBackendPage} />
        <Tab.Screen name="Login" component={LoginPage} />
        <Tab.Screen name="Menue" component={MenuePage} />
        <Tab.Screen name="Register" component={RegisterPage} />
        <Tab.Screen name="Archiv" component={ArchivPage} />
        <Tab.Screen name="NewQuestion" component={NewQuestionPage} />
        <Tab.Screen name="SingleQuestion" component={SingleQuestionPage} />
        <Tab.Screen name="Splash" component={SplashScreen} />
      </Tab.Navigator>
      
    </NavigationContainer>
    </ThemeProvider>
    </ImpProvider>
    );

}
