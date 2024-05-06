import { Alert } from 'react-native';
//import Toast from 'react-native-simple-toast';
import CryptoJS from 'react-native-crypto-js';
import React from 'react';
import { decode as atob, encode as btoa } from 'base-64';
import GLOBALS from '../constants';
const { BASE_URL, BASE_URL_VIDEO, STRINGS } = GLOBALS;
import {store} from '../store/configureStore';
//////const toast = args => Toast.show(args);
let { getState, dispatch } = store;
console.log(getState(),"store--<>>>")
const isInternet = async () =>
await NetInfo.isConnected.fetch().then(isConnected => isConnected);



const accessToken = () => {
  if (getState()?.authReducer?.loginData) {
    return getState()?.authReducer?.loginData?.data?.access_token;
  } 
};


let HIPPA_KEY = ""
{
  /* Common funtions  */
}

//let accessToken = () => storeObj.store.getState().authReducer.loginToken;

const logoutSessionExpired = text => {
  return Alert.alert('MediPulse', 'Session Expired', [
    { text: 'OK', onPress: () => console.log('hjjhbhnn') },
  ]);
};

const encryptRequest = data => {
  // return data;
  return {
    data: CryptoJS.AES.encrypt(
      JSON.stringify(data),
      HIPPA_KEY,
    ).toString(),
  };
};

const decryptRequest = data => {
  //return data;
  let bytes = CryptoJS.AES.decrypt(data, HIPPA_KEY);
  let res = (bytes.toString(CryptoJS.enc.Utf8));
  return res;
};

const alertWithTwoBtn = (title, message, btn1Text, btn2Text) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: btn1Text,
          onPress: () => resolve(false),
        },
        {
          text: btn2Text,
          onPress: () => resolve(true),
        },
      ],
      { cancelable: false },
    );
  });
};

const alertWithOneBtn = (title, message, btn1Text) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: btn1Text,
          onPress: () => resolve(false),
        },
      ],
      { cancelable: false },
    );
  });
};
const alertWithTwoBtnCancel = (title, message, btn1Text, btn2Text) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: btn1Text,
          onPress: () => resolve(false),
          style: 'cancel',
        },
        {
          text: btn2Text,
          onPress: () => resolve(true),
        },
      ],
      { cancelable: false },
    );
  });
};

const alertWithoutPromise = (title = '', message, btn1Text = 'Ok') => {
    Alert.alert(
      title,
      message,
      [
        {
          text: btn1Text,
        },
      ],
      { cancelable: false },
    );
  };


export {
  //toast,
  accessToken,
  isInternet,
  logoutSessionExpired,
  encryptRequest,
  decryptRequest,
  alertWithTwoBtn,
  alertWithOneBtn,
  alertWithTwoBtnCancel,
  alertWithoutPromise,
};

