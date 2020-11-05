import {
   GET_PROFILE,
   CLEAR_PROFILE,
   PROFILE_ERROR
}
from '../actions/types';

const INITIAL_STATE = {
   profile: null,
   profiles: [],
   repos: [],
   loading: true,
   error: {}
};

export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case GET_PROFILE:
      return {
         ...state,
         profile: action.payload,
         loading: false
      };
      
      case CLEAR_PROFILE:
      return {
         ...state,
         profile: null,
         repos: [],
         loading: false
      }

      case PROFILE_ERROR:
      return {
         ...state,
         loading: false,
         error: action.payload
      };

      default:
      return state;
   }
}