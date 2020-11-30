import {
   DELETE_POST,
   ADD_POST,
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
// add post
export const addPost = formData => async dispatch => {
   try {
      const { data } = await axios.post(`/api/posts`, formData);
      dispatch({
         type: ADD_POST,
         payload: data 
      });
      dispatch(setAlert('Post created', 'success'));
   }
   catch(err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// delete post
export const deletePost = postId => async dispatch => {
   try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch({
         type: DELETE_POST,
         payload: postId 
      });
      dispatch(setAlert('Post Removed', 'success'));
   }
   catch(err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}