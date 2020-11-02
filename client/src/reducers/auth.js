import { 
   REGISTER_SUCCESS, 
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR, 
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   loading: true,
   user: null,
};

export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case USER_LOADED:
      return {
         ...state,
         isAuthenticated: true,
         loading: false,
         user: action.payload
      };

      case REGISTER_SUCCESS || LOGIN_SUCCESS:
         localStorage.setItem('token', action.payload.token);
      return {
         ...state,
         ...action.payload,
         isAuthenticated: true,
         loading: false
      };

      case REGISTER_FAIL || AUTH_ERROR || LOGIN_FAIL || LOGOUT:
         localStorage.removeItem('token');
      return {
         ...state,
         token: null,
         isAuthenticated: false,
         loading: false
      };

      default:
      return state;
   }
}