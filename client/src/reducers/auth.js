import { 
   REGISTER_SUCCESS, 
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR, 
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   LOGOUT,
   DELETE_ACCOUNT
} from '../actions/types';

const INITIAL_STATE = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   loading: true,
   user: null
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
   switch(type) {
      case REGISTER_SUCCESS: 
      case LOGIN_SUCCESS:
      return {
         ...state,
         ...payload,
         isAuthenticated: true,
         loading: false
      };
      case USER_LOADED:
      return {
         ...state,
         isAuthenticated: true,
         loading: false,
         user: payload
      };
      case AUTH_ERROR:
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT:
      case DELETE_ACCOUNT:
      return {
         ...state,
         token: null,
         isAuthenticated: false,
         loading: false,
         user: null
      };
      default:
      return state;
   }
}
export default authReducer;
