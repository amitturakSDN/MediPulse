import GLOBALS from '../../constants';
const { API_URL, NETWORK_STATUS, ACTION_TYPE } = GLOBALS;
const { SUCCESS, SESSION_ERROR } = NETWORK_STATUS;
import RestClient from '../../helpers/RestClient';
import { alertWithoutPromise } from '../../helpers/common';


/**Api's for dashboard */
export function getHospitalList(cb) {
 
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.getCall(API_URL.GETHOSPITALSLIST);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_HOSPITAL_LIST,
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
/**Api's for dashboard */
export function getDepartmentList(id,cb) {
 
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.getCall(API_URL.GETDEPARTMENTLIST + id);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_DEPARTMENT_LIST,
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

/**Api's for dashboard */
export function enrollWaitingRoom(params,navigation,cb) {
  console.log(params,'para<<')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCall(API_URL.ENROLLWAITINGROOM, params);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_WAITING_ROOM_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
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


/**Api's for searchDoctorList */
export function searchDoctorList(hospitalId, departmentId, selectedDate,page,navigation) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let apiUrl = `${API_URL.SEARCHDOCTORLIST}?departmentId=${departmentId}&hospitalId=${hospitalId}&desiredDate=${selectedDate}&page=${page}`;
     console.log('listapiUrl')
      let json = await RestClient.getCall(apiUrl);
      console.log(json, 'searchDoctorListjson--');
      if (json.data.code === 200) {
        dispatch({
          type: ACTION_TYPE.SET_DOCTORS_LIST,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        // cb(json.data)
        navigation.navigate('DoctorListing')
        // navigation.reset({
        //   routes: [
        //     {
        //       name: "DoctorListing"
        //     }
        //   ],
        // });
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

export function bookAppointment(params,doctorId, navigation,cb) {
  console.log(params,'param++')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.putCall(`${API_URL.BOOKAPPOINTMENT}${doctorId}`, params);
      console.log(json,'json--')
      if (json.data.code == 201) {
        dispatch({
          type: ACTION_TYPE.SET_BOOK_NOW_DATA,
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
export function rescheduleAppointment(params,doctorId, navigation,cb) {
  console.log(params,'param++')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.patchCall(`${API_URL.RESCHEDULEAPPOINTMENT}${doctorId}`, params);
      console.log(json,'json--')
      if (json.data.code == 201) {
        dispatch({
          type: ACTION_TYPE.SET_BOOK_NOW_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
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
export function cancelOppointment(params,cb) {
  console.log(params,'param++')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.putCall(API_URL.CANCELAPPOINTMENT, params);
      console.log(json,'json--<<<')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_DASHBOARD_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(true)
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
export function outFromWaitingRoom(params,cb) {
  console.log(params,'param++')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCall(API_URL.OUTFROMWAITING, params);
      console.log(json,'json--<<<')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_DASHBOARD_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(true)
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

/**Api's for getMyAppointmentList */
export function getMyAppointmentList(cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.getCall(API_URL.MYAPPOINTMENTLIST);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_MYAPPOINTMENT_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}
/**Api's for getInflightData */
export function getInflightData(cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.getCall(API_URL.INFLIGHTDATA);
      console.log(json,'getInflightDatajson--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_INFLIGHTDATA_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}
/**Api's for searchHospitalList */
export function searchHospitalList(params,cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let apiUrl = `${API_URL.SEARCHHOSPITALLIST}${params}`;
      let json = await RestClient.getCall(apiUrl);
      console.log(json,'json--')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_MYAPPOINTMENT_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}
/**Api's for searchDepartmentList */
export function searchDepartmentList(params,cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let apiUrl = `${API_URL.SEARCHDEPARTMENTLIST}${params}`;
      let json = await RestClient.getCall(apiUrl);
      console.log(json,'json--')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_DEPARTMENTLIST_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}
/**Api's for searchDocumentList */
export function searchDocumentList(params,id,cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let apiUrl = `${API_URL.SEARCHDOCUMENTSLIST}${params}&patientId=${id}`;
      // let json = await RestClient.patchCall(`${API_URL.RESCHEDULEAPPOINTMENT}${doctorId}`, params);

      let json = await RestClient.getCall(apiUrl);
      console.log(json,'json--')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_MYAPPOINTMENT_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}
/**Api's for getAvialbleSlots */
export function getAvialbleSlots(date,doctorId,cb) {

  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let apiUrl = `${API_URL.GETAVAILABLESLOTS}${doctorId}?date=${date}`;
      let json = await RestClient.getCall(apiUrl);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_AVAILABLESLOTS_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}
/**Api's for getDoctorDetailsById */
export function getDoctorDetailsById(doctorId,cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let apiUrl = `${API_URL.GETDOCTORDETAILS}${doctorId}`;
      let json = await RestClient.getCall(apiUrl);
      console.log(json,'json--')
      if (json.data.code == 200) {
        dispatch({
          type: ACTION_TYPE.SET_DOCTORDETAILS_DATA,
          payload: json.data,
        });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}
/**Api's for getDoctorDetailsById */
export function getVisitDetailsById(visitId,cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let apiUrl = `${API_URL.GETVISITDETAILS}${visitId}`;
      let json = await RestClient.getCall(apiUrl);
      console.log(json,'json--')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_DOCTORDETAILS_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}

/**Api's for getDoctorList */
export function getDoctorList(cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.getCall(API_URL.DOCTORLIST);
      console.log(json,'json--')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_DOCTORLIST_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}
/**Api's for download file */
export function downloadDocument(path,cb) {
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let apiUrl = `${API_URL.DOWNLOADDOC}${path}`;
      console.log(apiUrl,'apiurl>>>>');
      let json = await RestClient.getCall(apiUrl);
      console.log(json,'json--')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_DOCTORLIST_DATA,
        //   payload: json.data,
        // });
        dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
        cb(json.data)
      } else {
        alertWithoutPromise('', json.data.message );
      } dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    } catch (error) {
      alertWithoutPromise(error.title, error.message);
      dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: false });
    }
  };
  
}


export function shareDocuments(params,doctorId,cb) {
  console.log(params,'para<<')
  return async dispatch => {
    dispatch({ type: ACTION_TYPE.TOGGLE_LOADER, payload: true });
    try {
      let json = await RestClient.postCall(`${API_URL.SHAREDOCUMENT}${doctorId}`, params);
      console.log(json,'json--')
      if (json.data.code == 200) {
        // dispatch({
        //   type: ACTION_TYPE.SET_WAITING_ROOM_DATA,
        //   payload: json.data,
        // });
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
