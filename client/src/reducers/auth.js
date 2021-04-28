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
   user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case USER_LOADED:
      return {
         ...state,
         isAuthenticated: true,
         loading: false,
         user: action.payload
      };
      case REGISTER_SUCCESS: 
      case LOGIN_SUCCESS:
         localStorage.setItem('token', action.payload.token);
      return {
         ...state,
         ...action.payload,
         isAuthenticated: true,
         loading: false
      };
      case AUTH_ERROR:
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT:
      case DELETE_ACCOUNT:
         localStorage.removeItem('token');
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