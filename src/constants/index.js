import ACTION_TYPE from './actions';
import FONTS from './fonts';
import COLOR from './colors';
import Strings from './string';
import API_URL from './urls';
export default {
  // BASE_URL: 'https://https://www.google.com/api/v1/',
  BASE_URL: 'https://www.google.com:9169/api/v1/',
  API_KEY: '',
  NETWORK_STATUS: {
    SUCCESS: 200,
    FAILURE: 400,
    AUTH_ERROR: 401,
    SESSION_ERROR: 417,
    SERVER_ERROR: 500,
  },
  ACTION_TYPE,
  FONTS,
  COLOR,
  Strings,
  API_URL,
};
