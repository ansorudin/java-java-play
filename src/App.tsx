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

const { Navigator, Screen } = createNativeStackNavigator<MainStackParamList>();

const MainApp = () => {
  // useEffect(() => {
  //   if (initialRoute && hydrated) {
  //     RNSplashScreen.hide();
  //   }
  // }, [initialRoute, hydrated]);

  // if (!initialRoute) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {MainScreens.map(screen => (
          <Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Navigator>
    </>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <ErrorBoundary>
          <GluestackUIProvider config={config}>
            <MainApp />
          </GluestackUIProvider>
        </ErrorBoundary>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
