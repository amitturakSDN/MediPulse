import GLOBALS from '../../constants';
const { API_URL, NETWORK_STATUS, ACTION_TYPE } = GLOBALS;
const { SUCCESS, SESSION_ERROR } = NETWORK_STATUS;
import RestClient from '../../helpers/RestClient';
import { alertWithoutPromise } from '../../helpers/common';


/**Api's for dashboard */
export function getDashboardData(navigation,cb) {
 
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.getCall(API_URL.GETDASHBOARDDATA,navigation);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_DASHBOARD_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
        // navigation.reset({
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
