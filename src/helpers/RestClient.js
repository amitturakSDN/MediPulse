import NetInfo from '@react-native-community/netinfo';
import {create} from 'apisauce';
import GLOBALS from '../constants';
const {BASE_URL, NETWORK_STATUS, Strings, APP_TYPE} = GLOBALS;
const {SUCCESS} = NETWORK_STATUS;
import {decryptRequest,accessToken, encryptRequest,logoutSessionExpired, alertWithOneBtn } from './common';
import axios from 'axios';
import { store } from '../store/configureStore';
import { alertWithoutPromise } from '../helpers/common';
import * as AppActions from '@actions';
let { getState, dispatch } = store;

let token = getState()?.authReducer?.loginData?.data?.access_token;
console.log(token,'accesstoken+++++')
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    // Authorization: "Basic Q3VyaW9NYXN0ZXI6QGluKSpeaGVfKGFsJSRtZSk1MiF+Rw==", //Basic Auth changes CurioMaster
    // 'Authorization': token,
  },
});
const apiToken = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    // Authorization: "Basic Q3VyaW9NYXN0ZXI6QGluKSpeaGVfKGFsJSRtZSk1MiF+Rw==", //Basic Auth changes CurioMaster
    // 'Authorization': token,
  },
});
const apiFormdata = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'multipart/form-data',
    'Authorization': token,
  },
});
// console.log(accessToken(),'accesstoken>>>')
class RestClient {
  static isConnected() {
    return new Promise(function (fulfill, reject) {
      NetInfo.fetch().then(state => {
        fulfill(true);
        if (state.isConnected) fulfill(state.isConnected);
        else {
          reject(state.isConnected);
        }
      });
    });
  }

  static postCallFormData(url, params) {
    let context = this;
    //api.setHeader('accesstoken', accessToken());
    console.log(params,url, 'api..........');
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
         console.log(`${BASE_URL}${url}`,params, 'baseulr')
         apiFormdata.post(`${BASE_URL}${url}`,params).then(response => {
            console.log(`${BASE_URL}${url}`, params);
            console.log(  response, 'res from API');
           
            if (response && response.status === 200) {
             // console.log("-----Decrypted Data-----", decryptRequest(response.data));
              fulfill(response);
            }                                                                                                                                       
           /*  else if (
              response.status != 200 &&
              decryptRequest(response.data) &&
              decryptRequest(response.data).message
            ) {
              reject({
                title: Strings.server.error,
                message: decryptRequest(response.data).message,
              });
            } */
             else {
              reject({
                title: Strings.server.error,
                message: Strings.server.server_is_not_reachable,
              });
            }
          });
        })
        .catch(error => {
          reject({
            title: Strings.server.error,
            message: Strings.server.server_is_not_reachable,
          });
        });
    });
  }

  static postCallRegister(url, params) {
    let context = this;
    console.log(params, BASE_URL, 'api..........>>');
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.post(`${BASE_URL}${url}`, params).then(response => {
            console.log(`${BASE_URL}${url}`, params);
            if (response && response.status === 200) {
              fulfill(response);
            } else if (
              response.status !== 200 &&
              decryptRequest(response.data) &&
              decryptRequest(response.data).message
            ) {
              reject({
                title: Strings.server.error,
                message: decryptRequest(response.data).message,
              });
            } else {
              reject({
                title: Strings.server.error,
                message: Strings.server.server_is_not_reachable,
              });
            }
          });
        })
        .catch(error => {
          reject({
            title: Strings.server.error,
            message: Strings.server.server_is_not_reachable,
          });
        });
    });
  }
  static postCallForgot(url, params) {
    let context = this;
    console.log(params, BASE_URL, 'api..........>>');
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          api.post(`${BASE_URL}${url}`, params).then(response => {
            console.log(`${BASE_URL}${url}`, params);
            if (response && response.status === 200) {
              fulfill(response);
            } else if (
              response.status !== 200 &&
              decryptRequest(response.data) &&
              decryptRequest(response.data).message
            ) {
              reject({
                title: Strings.server.error,
                message: decryptRequest(response.data).message,
              });
            } else {
              reject({
                title: Strings.server.error,
                message: Strings.server.server_is_not_reachable,
              });
            }
          });
        })
        .catch(error => {
          reject({
            title: Strings.server.error,
            message: Strings.server.server_is_not_reachable,
          });
        });
    });
  }
 
  static postCall(url, params) {
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    console.log("URL====", url, "TOKEN===", token);
    axios.defaults.headers= {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': token,
    };
    let context = this;
    console.log(params, BASE_URL, 'api..........>>');
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          axios.post(`${BASE_URL}${url}`, params).then(response => {
            console.log(`${BASE_URL}${url}`, params);
            if (response && response.status === 200) {
              fulfill(response);
            } else if (
              response.status !== 200 &&
              decryptRequest(response.data) &&
              decryptRequest(response.data).message
            ) {
              reject({
                title: Strings.server.error,
                message: decryptRequest(response.data).message,
              });
            } else {
              reject({
                title: Strings.server.error,
                message: Strings.server.server_is_not_reachable,
              });
            }
          });
        })
        .catch(error => {
          reject({
            title: Strings.server.error,
            message: Strings.server.server_is_not_reachable,
          });
        });
    });
  }

  static getCall(url,navigation) {
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjUsImVtYWlsIjoicmFqYXRAeW9wbWFpbC5jb20iLCJyb2xlIjoiUEFUSUVOVCIsInByb2ZpbGUiOnsib3RoZXJfaW5mbyI6eyJhbGxlcmdpZXMiOltdLCJjdXJyZW50TWVkaWNhdGlvbiI6W119LCJfaWQiOiI2NGEzYjVlZGY5ZDI3Y2I5MTczMDdhNjUiLCJ1c2VyX2lkIjo1LCJmaXJzdE5hbWUiOiJSYWphdCIsImxhc3ROYW1lIjoiU21hcnQiLCJwcm9maWxlUGhvdG8iOiJpbWFnZS0xNjg4NDUwNTQyNjI4LS5qcGciLCJhZGRyZXNzIjoiIiwiaW5zdXJhbmNlTm8iOiIiLCJpbnN1cmFuY2VQcm92aWRlciI6IiIsImluc3VyYW5jZVByb3ZpZGVySWQiOiIiLCJjaXR5IjoiIiwic3RhdGUiOiIiLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTA0VDA2OjAyOjIxLjI5NloiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTA0VDA2OjAyOjIyLjg5M1oiLCJfX3YiOjB9LCJpYXQiOjE2ODg0NjIwMDIsImV4cCI6MTY4ODQ2MjEyMn0.SVGX-py4Orm6GJ2kvT-3UlA-MaUdIuVtIR5Ns0vKMZw';
    console.log("URL====", url, "TOKEN===", token);
    axios.defaults.headers= {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': token,
    };
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          axios.get(`${BASE_URL}${url}`).then(response => {
            console.log('API call for get call ' + BASE_URL + url, response);
            if (response.status === 200) {
              fulfill(response);
            } else {
              reject({
                title: Strings.server.error,
                message: Strings.server.server_is_not_reachable,
              });
            }
          }).catch(error => {
          // alertWithoutPromise(error.title, error.message);
          // console.log(error.message,'error >>>>')
          console.log(error.response.data.code,'error ++>>>>')
          if (error.response.data.code === 403) {
            // if (error.code === 403) {
              alertWithOneBtn('Session Expired').then(res => {
                if (navigation) {
                  dispatch(AppActions.Logout(navigation));
                }
              });
            }
       
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  static putCallProfilePicture(url, params) {
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    axios.defaults.headers= {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data',
      'Authorization': token,
    };
    let context = this;
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          axios.put(`${BASE_URL}${url}`,params).then(response => {
            console.log(`${BASE_URL}${url}`, params);
           
            if (response && response.status === 200) {
             // console.log("-----Decrypted Data-----", decryptRequest(response.data));
              fulfill(response);
            }                                                                                                                                       
           else if (
              response.status != 200 &&
              decryptRequest(response.data) &&
              decryptRequest(response.data).message
            ) {
              reject({
                title: Strings.server.error,
                message: decryptRequest(response.data).message,
              });
            } 
             else {
              reject({
                title: Strings.server.error,
                message: Strings.server.server_is_not_reachable,
              });
            }
          });
        })
        .catch(error => {
          fulfill({
            message: Strings.server_is_not_reachable,
          });
        });
    });
  }
  static putCall(url,params) {
    console.log(params,'paramscheck')
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    console.log("URL====", url, "TOKEN===", token);
    axios.defaults.headers= {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': token,
    };
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          axios.put(`${BASE_URL}${url}`,params).then(response => {
            console.log('API call for get call ' + BASE_URL + url, response);
            if (response.status === 200) {
              fulfill(response);
            } else {
              reject({
                title: Strings.server.error,
                message: Strings.server.server_is_not_reachable,
              });
            }
          }).catch(error => {
            reject(error);
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  static patchCall(url,params) {
    console.log(params,'paramscheck')
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    console.log("URL====", url, "TOKEN===", token);
    axios.defaults.headers= {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': token,
    };
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          axios.patch(`${BASE_URL}${url}`,params).then(response => {
            console.log('API call for get call ' + BASE_URL + url, response);
            if (response.status === 200) {
              fulfill(response);
            } else {
              reject({
                title: Strings.server.error,
                message: Strings.server.server_is_not_reachable,
              });
            }
          }).catch(error => {
            reject(error);
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default RestClient;