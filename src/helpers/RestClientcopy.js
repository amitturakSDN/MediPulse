import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { store } from '../store/configureStore';
import GLOBALS from '../constants';
import { decryptRequest } from './common';

const { BASE_URL, NETWORK_STATUS, Strings } = GLOBALS;
const { SUCCESS } = NETWORK_STATUS;

let { getState,dispatch } = store;

class RestClient {
  static isConnected() {
    return new Promise(function (fulfill, reject) {
      NetInfo.fetch()
        .then(state => {
          if (state.isConnected) {
            fulfill(state.isConnected);
          } else {
            reject(state.isConnected);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static handleResponse(response, fulfill, reject) {
    if (response && response.status === 200) {
      fulfill(response);
    } else {
      reject({
        title: Strings.server.error,
        message: decryptRequest(response?.data)?.message || Strings.server.server_is_not_reachable,
      });
    }
  }

  static handleCatch(error) {
    console.log('Error:', error);
    setTimeout(() => {
      dispatch({ type: ACTION_TYPE.LOGOUT, payload: {} });
    }, 1000);
    throw error;
  }

  static postCallFormData(url, params) {
    return new Promise(function (fulfill, reject) {
      RestClient.isConnected()
        .then(() => {
          axios
            .post(`${BASE_URL}${url}`, params)
            .then(response => {
              RestClient.handleResponse(response, fulfill, reject);
            })
            .catch(error => {
              RestClient.handleCatch(error);
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
    return new Promise(function (fulfill, reject) {
      RestClient.isConnected()
        .then(() => {
          axios
            .post(`${BASE_URL}${url}`, params)
            .then(response => {
              RestClient.handleResponse(response, fulfill, reject);
            })
            .catch(error => {
              RestClient.handleCatch(error);
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
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: token,
    };
    return new Promise(function (fulfill, reject) {
      RestClient.isConnected()
        .then(() => {
          axios
            .post(`${BASE_URL}${url}`, params)
            .then(response => {
              RestClient.handleResponse(response, fulfill, reject);
            })
            .catch(error => {
              RestClient.handleCatch(error);
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

  static getCall(url) {
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: token,
    };
    return new Promise(function (fulfill, reject) {
      RestClient.isConnected()
        .then(() => {
          axios
            .get(`${BASE_URL}${url}`)
            .then(response => {
              if (response.status === 200) {
                fulfill(response);
              } else {
                reject({
                  title: Strings.server.error,
                  message: Strings.server.server_is_not_reachable,
                });
              }
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static putCallProfilePicture(url, params) {
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    axios.defaults.headers = {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    };
    return new Promise(function (fulfill, reject) {
      RestClient.isConnected()
        .then(() => {
          axios
            .put(`${BASE_URL}${url}`, params)
            .then(response => {
              RestClient.handleResponse(response, fulfill, reject);
            })
            .catch(error => {
              RestClient.handleCatch(error);
            });
        })
        .catch(error => {
          fulfill({
            message: Strings.server_is_not_reachable,
          });
        });
    });
  }

  static putCall(url, params) {
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: token,
    };
    return new Promise(function (fulfill, reject) {
      RestClient.isConnected()
        .then(() => {
          axios
            .put(`${BASE_URL}${url}`, params)
            .then(response => {
              if (response.status === 200) {
                fulfill(response);
              } else {
                reject({
                  title: Strings.server.error,
                  message: Strings.server.server_is_not_reachable,
                });
              }
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static patchCall(url, params) {
    let token = getState()?.authReducer?.loginData?.data?.access_token;
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: token,
    };
    return new Promise(function (fulfill, reject) {
      RestClient.isConnected()
        .then(() => {
          axios
            .patch(`${BASE_URL}${url}`, params)
            .then(response => {
              if (response.status === 200) {
                fulfill(response);
              } else {
                reject({
                  title: Strings.server.error,
                  message: Strings.server.server_is_not_reachable,
                });
              }
            })
            .catch(error => {
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