import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackParamList } from './routes/types';
import { MainScreens } from './routes/MainNavigatorScreens';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './routes/MainNavigator';
import { ErrorBoundary } from './ErrorBoundary';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ButtonHeader } from './components/ButtonHeader';
import { HomeScreen, ScanNfcScreen, TaxBalanceScreen, DiceScreen } from './pages';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from './routes/types';
import { useEffect } from 'react';
import { useGlobalStore } from './stores';
import NfcManager from 'react-native-nfc-manager';

const { Navigator, Screen } = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const navigate = useNavigation<MainStackNavigationProps>();

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      if (deviceIsSupported) {
        await NfcManager.start();
        console.log('nfc support');
      } else {
        console.log('nfc not support');
      }
    };
    checkIsSupported();
  }, []);

  const goBack = () => {
    return <ButtonHeader isLeft buttonHeader={() => navigate.goBack()} />;
  };

  const exitGame = () => {
    return <ButtonHeader buttonHeader={() => navigate.push('ExitGame')} />;
  };

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            headerRight: exitGame,
            tabBarLabel: 'Home',
            headerTitleAlign: 'center',
          })}
        />
        <Tab.Screen
          name="NFC"
          component={ScanNfcScreen}
          options={() => ({
            headerLeft: goBack,
            tabBarStyle: { display: 'none' },
            headerTitleAlign: 'center',
          })}
        />
        <Tab.Screen
          name="Tax"
          component={TaxBalanceScreen}
          options={() => ({ headerLeft: goBack, headerTitleAlign: 'center' })}
        />
        <Tab.Screen
          name="Dice"
          component={DiceScreen}
          options={() => ({ headerLeft: goBack, headerTitleAlign: 'center' })}
        />
      </Tab.Navigator>
    </>
  );
};

const MainApp2 = () => {
  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      if (deviceIsSupported) {
        await NfcManager.start();
        console.log('nfc support');
      } else {
        console.log('nfc not support');
      }
    };
    checkIsSupported();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          tabBarStyle: { display: 'none' },
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

function RootStack() {
  const { activePlayer } = useGlobalStore();
  const renderTab = activePlayer.length > 0 ? MainApp : MainApp2;

  return (
    <Navigator initialRouteName="Home_Tabs" screenOptions={{ headerShown: false }}>
      <Screen name="Home_Tabs" component={renderTab} />
      {MainScreens.map(screen => (
        <Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <ErrorBoundary>
          <GluestackUIProvider config={config}>
            <RootStack />
          </GluestackUIProvider>
        </ErrorBoundary>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
