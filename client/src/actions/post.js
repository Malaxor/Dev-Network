import {
   GET_POSTS,
   POST_ERROR,
   UPDATE_LIKES
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import { post } from 'request';

// get posts
export const getPosts = () => async dispatch => {
   try {
      const { data } = await axios.get('/api/posts');
      dispatch({
         type: GET_POSTS,
         payload: data
      });
   }
   catch(err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// add like
export const addLike = postId => async dispatch => {
   try {
      const { data } = await axios.put(`/api/posts/${postId}/like`);
      dispatch({
         type: UPDATE_LIKES,
         payload: { id: postId, likes: data }
      });
   }
   catch(err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// add like
export const removeLike = postId => async dispatch => {
   try {
      const { data } = await axios.put(`/api/posts/${postId}/unlike`);
      dispatch({
         type: UPDATE_LIKES,
         payload: { id: postId, likes: data }
      });
   }
   catch(err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}