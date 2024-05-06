import GLOBALS from '../../constants';
const { API_URL, NETWORK_STATUS, ACTION_TYPE } = GLOBALS;
const { SUCCESS, SESSION_ERROR } = NETWORK_STATUS;
import RestClient from '../../helpers/RestClient';
import { alertWithoutPromise } from '../../helpers/common';

/**Api's for Login */
export function login(params, navigation,) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCall(API_URL.LOGIN, params);
      console.log(json,'json---->')
      console.log( json.data.data.access_token ,'json.data.data---->')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_LOGIN_DATA,
          payload: json.data ,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        // navigation.navigate('ScheduleList')
        navigation.reset({
          index: 1,
          routes: [
            { 
              name: "Home"
            }
          ],
        })
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}

/**Api's for userRegister */
export function userRegister(params,callback) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCallRegister(API_URL.REGISTER, params);
      console.log(json.data,'json1<')
      if (json.data.code == 200) {
        console.log(json.data,'json--2<<<')
        // dispatch({
        //   type: ACTION_TYPE.SET_LOGIN_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        return callback (json.data)
        // navigation.navigate('ScheduleList')
        // navigation.reset({
        //   index: 1,
        //   routes: [
        //     {
        //       name: "Home"
        //     }
        //   ],
        // })
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}

/**Api's for ProfilePicture */
export function ProfilePicture(params,index) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.putCallProfilePicture(API_URL.PROFILEPICTURE, params);
      console.log(json,'jsonProfilePicture--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_PROFIL_PICTURE,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        index
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for otherUserRegister */
export function otherUserRegister(params, navigation) {
  console.log(params,'param++')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.putCall(API_URL.PROFILEUPDATE, params);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_PROFIL_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        navigation.reset({
          routes: [
            {
              name: "Home"
            }
          ],
        })
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for otherUserRegister */
export function otherUserUpdate(params, index) {
  console.log(params,'param++')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.putCall(API_URL.PROFILEUPDATE, params);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_PROFIL_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
       index
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for otherUserRegister */
export function medicalUserUpdate(params, navigation) {
  console.log(params,'param++')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.putCall(API_URL.PROFILEUPDATE, params);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_PROFIL_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        navigation.reset({
          index: 1,
          routes: [
            { 
              name: "Home"
            }
          ],
        })
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for otherUserRegister */
export function profileUpdate(params, callback) {
  console.log(params,'param++')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.putCall(API_URL.PROFILEUPDATE, params);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_PROFIL_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        return callback (json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for getprofile */
export function getProfile( cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.getCall(API_URL.GETPROFILE);
      console.log(json.data.code, 'json>>><<<');
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_PROFIL_DATA,
          payload: json.data,
        });
        cb(json.data);
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
      } else {
        // alertWithoutPromise('', json.data.message);
      }
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for sendOtp PASSWORD */
export function sendOtp(params, navigation,) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCallForgot(API_URL.SENDOTP, params)
      console.log(json,'json>>>>');
      if (json.data.code == 200 ) {
        dispatch({
          type: ACTION_TYPE.SET_OTP_DATA,
          payload: json.data,
        });
        navigation.reset({
          routes: [
            {
              name: "OtpScreen",
              params: params
            }
          ],
        });
          
        alertWithoutPromise('', json.data.message);
      } else {
        alertWithoutPromise('', json.data.message);
      }
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      console.log(error,'error>>>')
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for validateOtp PASSWORD */
export function validateOtp(params,otp, navigation) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCallForgot(`${API_URL.VALIDATEOTP}${otp}`, params);
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_OTPID_DATA,
          payload: json.data,
        });
        navigation.reset({
          routes: [
            {
              name: "ConfirmPassword",
              // params: params
            }
          ],
        });
        
        // alertWithoutPromise('', json.data.message);
      } else {
        alertWithoutPromise('', 'Incorrect OTP');
      }
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      console.log(error,'error>>>')
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for validateOtp register */
export function validateRegisterOtp(params,otp,userId, navigation,cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCallForgot(`${API_URL.VALIDATEOTPREGISTER}${otp}&userId=${userId}`, params);
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_LOGIN_DATA,
          payload: json.data,
        });
        // navigation.reset({
        //   routes: [
        //     {
        //       name: "ConfirmPassword",
        //       // params: params
        //     }
        //   ],
        // });
        cb(json.data);
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        // alertWithoutPromise('', json.data.message);
      } else {
        alertWithoutPromise('', 'Incorrect OTP');
      }
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      console.log(error,'error>>>')
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}
/**Api's for REST PASSWORD */
export function resetPassword(params,otp_user_id, navigation,) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCallForgot(`${API_URL.RESETPASSWORD}${otp_user_id}`, params);

      console.log(json,'json<<<<')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_RESET_DATA,
        //   payload: json.data,
        // });
        navigation.reset({
          routes: [
            {
              name: "Login",
              // params: params
            }
          ],
        });
        // navigation.navigate('Login')
      } else {
        alertWithoutPromise('', json.data.message);
      }
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}


/** API for change Password */
export function changePassword(params, navigation,cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCall(API_URL.CHANGEPASSWORD, params)
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_CHANGE_PASSWORD_DATA,
        //   payload: json.data,
        // });
        cb(json.data);
        navigation.reset({
          routes: [
            {
              name: "Login",
              // params: params
            }
          ],
        });
        // alerte('', json.data.message);
      } else {
        alertWithoutPromise('', json.data.message);
      }
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
}

export function Logout(navigation) {
  return async (dispatch, getState) => {
    console.log('lohgouttt');
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'AuthStack',
          state: {
            routes: [
              {
                name: 'Login',
              },
            ],
          },
        },
      ],
    });
    dispatch({ type: ACTION_TYPE.LOGOUT, payload: {} });
  };
}