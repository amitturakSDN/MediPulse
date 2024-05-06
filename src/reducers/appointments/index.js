import GLOBALS from '../../constants';
const { ACTION_TYPE } = GLOBALS;
const initialState = {
  isLoading: false,
  departmentList: null,
  hospitalList: null,
  doctorsList: null,
  bookNowData: null,
  enrollWaitngRoom: null,
  myAppointmentList: null,
  setInflightData: null,
  availableSlots: null,
  doctorDetails: null,
  symptoms: [],
};
function appointmentReducer(state = initialState, action) {

  switch (action.type) {
    case ACTION_TYPE.TOGGLE_LOADER:
      return { ...state, isLoading: action.payload };
    case ACTION_TYPE.SET_HOSPITAL_LIST:
      return { ...state, hospitalList: action.payload };
    case ACTION_TYPE.SET_DEPARTMENT_LIST:
      return { ...state, departmentList: action.payload };
    case ACTION_TYPE.SET_DOCTORS_LIST:
      return { ...state, doctorsList: action.payload };
    case ACTION_TYPE.SET_BOOK_NOW_DATA:
      return { ...state, bookNowData: action.payload };
    case ACTION_TYPE.SET_WAITING_ROOM_DATA:
      return { ...state, enrollWaitngRoom: action.payload };
    case ACTION_TYPE.SET_MYAPPOINTMENT_DATA:
      return { ...state, myAppointmentList: action.payload };
    case ACTION_TYPE.SET_INFLIGHTDATA_DATA:
      return { ...state, setInflightData: action.payload };
    case ACTION_TYPE.SET_AVAILABLESLOTS_DATA:
      return { ...state, availableSlots: action.payload };
    case ACTION_TYPE.SET_DOCTORDETAILS_DATA:
      return { ...state, doctorDetails: action.payload };
    case ACTION_TYPE.SET_DEPARTMENTLIST_DATA:
      return { ...state, symptoms: action.payload };
    default:
      return state;
  }
}
export default appointmentReducer;