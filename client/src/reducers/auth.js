import { 
   REGISTER_SUCCESS, 
   REGISTER_FAILED,
   USER_LOADED,
   AUTH_ERROR 
} 
from '../actions/types';

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

      case REGISTER_SUCCESS:
         localStorage.setItem('token', action.payload.token);
      return {
         ...state,
         ...action.payload,
         isAuthenticated: true,
         loading: false
      };

      case REGISTER_FAILED || AUTH_ERROR:
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