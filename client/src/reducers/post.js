import {
   GET_POSTS,
   POST_ERROR
} from '../actions/types';

const INITIAL_STATE = {
   posts: [],
   post: null,
   loading: true,
   error: {}
};

export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case GET_POSTS:
      return {
         ...state,
         posts: action.payload,
         loading: false
      };
      case POST_ERROR:
      return {
         ...state,
         error: action.payload,
         loading: false
      };
      default:
      return state;
   }
}