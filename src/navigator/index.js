import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import ScanQR from '../screens/dashboard/scanQR';
import AuthStackNavigator from './AuthStack';
import TabNavigator from './TabNavigator'
import DrawerNavigator from './DrawerNavigator'
import EditProfile from '../screens/dashboard/editProfile';
import GLOBALS from '../constants';
const { APP_TYPE, ACTION_TYPE } = GLOBALS;
import { store } from '../store/configureStore';
import Dashboard from '../screens/dashboard/dashboard';
import BookAppointment from '../screens/dashboard/bookAppointment';
import DoctorListing from '../screens/dashboard/appointmentDoctorListing';
import BookNowForm from '../screens/dashboard/bookNowForm';
import visitsDetails from '../screens/dashboard/visitsDetails';
import Vaccination from '../screens/dashboard/vaccination';
import Reschedule from '../screens/dashboard/reschedule';

const Stack = createNativeStackNavigator();
const Root = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  
  useEffect(() => {
    let { getState, dispatch } = store;
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });

    if (getState().authReducer?.loginData) {
      console.log(getState().authReducer?.loginData,'logintoken')
      // checkLocationPermission(true);
      setInitialRoute('Home');
    } else {
      setInitialRoute('AuthStack');
    }
  }, []);
  const personId = 1;
  const linking = {
    prefixes: ['MediPulseapp://'],
    config: {
      // initialRouteName: initialRoute,
      screens: {
        Home: 'Home/:personId',
        // Details: {
        //   path: 'details/:personId'
        // }
      }
    }
  };
  return initialRoute != null ? (
    <NavigationContainer linking={linking}> 
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ScanQR" component={ScanQR} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="DoctorListing" component={DoctorListing} />
      <Stack.Screen name="BookNowForm" component={BookNowForm} />
      <Stack.Screen name="visitsDetails" component={visitsDetails} />
      <Stack.Screen name="Vaccination" component={Vaccination} />
      <Stack.Screen name="Reschedule" component={Reschedule} />
    </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <></>
  );
};

export default Root;