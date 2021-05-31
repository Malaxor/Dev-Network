import {
   DELETE_POST,
   ADD_POST,
   GET_POSTS,
   GET_POST,
   ADD_COMMENT,
   REMOVE_COMMENT,
   POST_ERROR,
   UPDATE_LIKES
} from './types';
import axios from 'axios';
import { addAlert } from './alert';
// import { post } from 'request';

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
// get post by id
export const getPost = postId => async dispatch => {
   try {
      const { data } = await axios.get(`/api/posts/${postId}`);
      
      dispatch({
         type: GET_POST,
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
// remove like
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
      dispatch(addAlert('Post created', 'success'));
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
      dispatch(addAlert('Post Removed', 'success'));
   }
   catch(err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// add comment
export const addComment = (postId, formData) => async dispatch => {
   try {
      const { data } = await axios.post(`/api/posts/${postId}/comment`, formData);
      
      dispatch({
         type: ADD_COMMENT,
         payload: data 
      });
      dispatch(addAlert('Comment added', 'success'));
   }
   catch(err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
   try {
      await axios.delete(`/api/posts/${postId}/comment/${commentId}`);
      
      dispatch({
         type: REMOVE_COMMENT,
         payload: commentId
      });
      dispatch(addAlert('Comment removed', 'success'));
   }
   catch(err) {
      dispatch({
         type: POST_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}