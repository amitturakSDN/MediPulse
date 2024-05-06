import GLOBALS from '../../constants';
const { ACTION_TYPE } = GLOBALS;
const initialState = {
  isLoading: false,
  loginData: null,
  registerData: null,
  resetData: null,
  changeData: null,
  otpData: null,
  profilePicture: null,
  profileData: null,
  otpIdData: null,
};
function authReducer(state = initialState, action) {


  switch (action.type) {
    case ACTION_TYPE.TOGGLE_LOADER:
      return { ...state, isLoading: action.payload };
    case ACTION_TYPE.SET_LOGIN_DATA:
      return { ...state, loginData: action.payload };
    case ACTION_TYPE.SET_REGISTER_DATA:
      return { ...state, registerData: action.payload };
    case ACTION_TYPE.SET_PROFIL_PICTURE:
      return { ...state, profilePicture: action.payload };
    case ACTION_TYPE.SET_PROFIL_DATA:
      return { ...state, profileData: action.payload };
    case ACTION_TYPE.SET_OTP_DATA:
      return { ...state, otpData: action.payload };
    case ACTION_TYPE.SET_OTPID_DATA:
      return { ...state, otpIdData: action.payload };
    case ACTION_TYPE.SET_CHANGE_PASSWORD_DATA:
      return { ...state, changeData: action.payload };
    case ACTION_TYPE.LOGOUT:
      return { ...state, isLoading: false, loginData: null, };
    default:
      return state;
  }
}
export default authReducer;