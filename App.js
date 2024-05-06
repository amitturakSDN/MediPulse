import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View,Text} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/configureStore';
let { getState, dispatch } = store;
const Stack = createNativeStackNavigator();
import Loading from './src/components/loader';
import AuthStackNavigator from './src/navigator/AuthStack';
import DrawerNavigator from './src/navigator/DrawerNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import Root from './src/navigator';
import SetLanguage from './src/constants/setLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringsOfLanguage from './src/constants/ScreenStrings';
import messaging from '@react-native-firebase/messaging';
 
export default function App() {
  const changelan=async()=>{
    const localStorageLanguage = await AsyncStorage.getItem('language');
    console.log("localStorageLanguage",localStorageLanguage);
    stringsOfLanguage.setLanguage(localStorageLanguage)
  }
  
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      // Register for remote messages (FCM token will be fetched once the APNS token is provided)
      messaging().registerDeviceForRemoteMessages();
  
      // Get the APNS token from iOS and provide it to FCM
      const deviceToken = await messaging().getAPNSToken();
      if (deviceToken) {
        messaging().setAPNSToken(deviceToken, 'your-sender-id');
      }
  
      // Fetch the FCM token and handle token refresh
      messaging()
        .getToken()
        .then(token => {
          console.log('FCM Token:', token);
          // Save the token or handle it as needed
          // setToken(token)
        });
  
      messaging().onTokenRefresh(token => {
        console.log('Token Refreshed:', token);
        // Handle token refresh if needed
      });
    }
  };

  useEffect(() => {
    requestUserPermission();
    changelan()
    // let { getState, dispatch } = store
    if (
      getState().authReducer?.loginData) {
      console.log(getState().authReducer?.loginData,'getstate-->')
    } else {
      console.log(getState(),'getstate-->')
    }
  }, [2000])
  // const linking = {
  //   prefixes: ['MediPulseapp://']
  // };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <View style={{ flex: 1 }}>
          <Loading />
        {/* <NavigationContainer linking={linking}> */}
          {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator> */}
          <Root />
        {/* </NavigationContainer> */}
        </View>
      </PersistGate>
    </Provider>
);
}
console.disableYellowBox = true;
