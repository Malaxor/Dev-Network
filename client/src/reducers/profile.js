import {
   GET_PROFILE,
   GET_PROFILES,
   GET_REPOS,
   CREATE_PROFILE,
   UPDATE_PROFILE,
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
      case CREATE_PROFILE:
      case UPDATE_PROFILE:
      return {
         ...state,
         profile: action.payload,
         loading: false
      };
      case GET_PROFILES:
      return {
         ...state,
         profiles: action.payload,
         loading: false
      };
      case GET_REPOS:
      return {
         ...state,
         repos: action.payload,
         loading: false
      };
      case CLEAR_PROFILE:
      return {
         ...state,
         profile: null,
         repos: [],
         loading: false
      };
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