import { check, PERMISSIONS, RESULTS, request, requestMultiple } from 'react-native-permissions';
import { Platform, View, Linking, Alert, AppState ,PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from  'react'
import RNExitApp from 'react-native-exit-app';
import Strings from '../constants/string';
import { alertWithTwoBtn } from './common';
// import { messaging } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AuthorizationStatus, EventType } from '@notifee/react-native';
import stringsOfLanguage from '../constants/ScreenStrings'    

const requestPermission = async () => {
  const permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
      : [PERMISSIONS.ANDROID.BLUETOOTH_SCAN, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

  const statuses = await requestMultiple(permissions);
  for (var index in permissions) {
    checkSwithCase(statuses[permissions[index]])
  }
}
const checkSwithCase = async (result) => {
  console.log("result==>", result, RESULTS);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log('Bluetooth is not available (on this device / in this context)')
      break
    case RESULTS.DENIED:
      console.log('The Bluetooth permission has not been requested / is denied but requestable')
      requestPermission()
      break
    case RESULTS.LIMITED:
      console.log('The Bluetooth permission is limited: some actions are possible')
      break
    case RESULTS.GRANTED:
      console.log('The Bluetooth permission is granted')
      return true
    case RESULTS.BLOCKED:
      console.log('The Bluetooth permission is denied and not requestable anymore')
      alertWithTwoBtn(stringsOfLanguage.alert.alert_text, Strings.permission_text.location_denied, "Not Now", "Open Settings",).then(res => {
        if (res) {
          Linking.openSettings().catch(() => {
            console.warn("Cannot open settings");
          })
        }
        else {
          RNExitApp.exitApp();
        }
      })
      break
  }
}

export const checkLocationPermission = async (showAlert = true) => {
  const permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
      : [PERMISSIONS.ANDROID.BLUETOOTH_SCAN, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

  const statuses = await requestMultiple(permissions);
  for (var index in permissions) {
    checkSwithCase(statuses[permissions[index]])
  }

  if (Platform.OS === 'android') {
    let granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      // PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    ]);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      ]);
    }
  }

  //notification permission
  const settings = await notifee.getNotificationSettings();
  if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
    console.log('Notification permissions has been authorized');
  } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    console.log('Notification permissions has been denied');
  }
}

const getPermissions = async () => {
  if (Platform.OS === 'android') {
    let granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      // PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    ]);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      ]);
    }
  }
};
 //notification permissions
 async function checkNotificationPermission() {
  const settings = await notifee.getNotificationSettings();
  if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
    console.log('Notification permissions has been authorized');
  } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    console.log('Notification permissions has been denied');
  }
}

export const checkNotifeePermission = () => {


   getPermissions()
  
  checkNotificationPermission()
  
  }