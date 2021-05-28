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

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
   switch(type) {
      case GET_PROFILE:
      case CREATE_PROFILE:
      case UPDATE_PROFILE:
      return {
         ...state,
         profile: payload,
         loading: false
      };
      case GET_PROFILES:
      return {
         ...state,
         profiles: payload,
         loading: false
      };
      case GET_REPOS:
      return {
         ...state,
         repos: payload,
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
         error: payload,
         profile: null
      };
      default:
      return state;
   }
}
export default profileReducer;