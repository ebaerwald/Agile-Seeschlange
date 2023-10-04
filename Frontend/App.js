import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FrontendTestScreen } from './pages/FrontendTestScreen'
import { LoginPage } from './pages/LoginPage'
import { SplashScreen } from './pages/SplashScreen'
import { RegisterPage } from './pages/RegisterPage'
import { MenuePage } from './pages/MenuePage'
import { ArchivPage } from './pages/ArchivPage'

const NativeStack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <NativeStack.Navigator initialRouteName={'FrontendTestScreen'}>
          <NativeStack.Screen name={'FrontendTestScreen'} component={FrontendTestScreen} options={{ title: 'FrontendTestScreen'}} />
          <NativeStack.Screen name={'Login'} component={LoginPage} />
          <NativeStack.Screen name={'Splash'} component={SplashScreen} />
          <NativeStack.Screen name={'Register'} component={RegisterPage} />
          <NativeStack.Screen name={'Menue'} component={MenuePage} />
          <NativeStack.Screen name={'Archiv'} component={ArchivPage} />
        </NativeStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
