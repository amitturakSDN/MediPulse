import GLOBALS from '../../constants';
const { ACTION_TYPE } = GLOBALS;
const initialState = {
  isLoading: false,
  
  dashboardData: null,
};
function homeReducer(state = initialState, action) {

  switch (action.type) {
    case ACTION_TYPE.TOGGLE_LOADER:
      return { ...state, isLoading: action.payload };
    case ACTION_TYPE.SET_DASHBOARD_DATA:
      return { ...state, dashboardData: action.payload };
    
    default:
      return state;
  }
}
export default homeReducer;