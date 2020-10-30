import { REGISTER_SUCCESS, REGISTER_FAILED } from '../actions/types';

const INITIAL_STATE = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   loading: true,
   user: null,
};

export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case REGISTER_SUCCESS:
         localStorage.setItem('token', action.payload.token);
      return {
         ...state,
         ...action.payload,
         isAuthenticated: true,
         loading: false
      };

      case REGISTER_FAILED:
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