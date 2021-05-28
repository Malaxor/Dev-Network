import axios from 'axios';
import { addAlert } from './alert';
import {
   GET_PROFILE,
   GET_PROFILES,
   GET_REPOS,
   CREATE_PROFILE,
   UPDATE_PROFILE,
   PROFILE_ERROR,
   CLEAR_PROFILE,
   DELETE_ACCOUNT
}
from './types';

// get logged in user profile
export const getCurrentUserProfile = () => async dispatch => {
   try {
      const { data } = await axios.get('/api/profile/me');

      dispatch({
         type: GET_PROFILE,
         payload: data
      });
   } 
   catch(err) {
      const { statusText, status } = err.response;
      
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// get profile by user id
export const getProfileByUserId = userId => async dispatch => {
   try {
      const { data } = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
         type: GET_PROFILE,
         payload: data
      });
   } 
   catch(err) {
      const { statusText, status } = err.response;

      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// github repos
export const getGitHubRepos = userName => async dispatch => {
   try {
      const { data } = await axios.get(`/api/profile/github/${userName}`);

      dispatch({
         type: GET_REPOS,
         payload: data
      });
   } 
   catch(err) {
      const { statusText, status } = err.response;

      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// get all profiles
export const getProfiles = () => async dispatch => {
   dispatch({ type: CLEAR_PROFILE });
   
   try {
      const { data } = await axios.get('/api/profile');

      dispatch({
         type: GET_PROFILES,
         payload: data
      });
   } 
   catch(err) {
      const { statusText, status } = err.response;

      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
   try {
      const { data } = await axios.post('/api/profile', formData);

      dispatch({
         type: CREATE_PROFILE,
         payload: data
      });
      dispatch(addAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
      // redirect to dashboard when creating, not updating, the profile
      if(!edit) {
         history.push('/dashboard');
      }
   } 
   catch(err) {
      const { errors, statusText, status } = err.response.data;

      if(errors) {
         errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// add experience
export const addExperience = (formData, history) => async dispatch => {
   try {
      const { data } = await axios.put('/api/profile/experience', formData);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });
      dispatch(addAlert('Experience added', 'success'));
      history.push('/dashboard');
   } 
   catch(err) {
      const { errors, statusText, status} = err.response.data;

      if(errors) {
         errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// delete experience
export const deleteExperience = id => async dispatch => {
   try {
      const { data } = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });
      dispatch(addAlert('Experience removed', 'success'));

   }
   catch(err) {
      const { statusText, status } = err.response;

      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// add education
export const addEducation = (formData, history) => async dispatch => {
   try {
      const { data } = await axios.put('/api/profile/education', formData);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });
      dispatch(addAlert('Education added', 'success'));
      history.push('/dashboard');
   } 
   catch(err) {
      const { errors, statusText, status} = err.response.data;

      if(errors) {
         errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// delete education
export const deleteEducation = id => async dispatch => {
   try {
      const { data } = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });
      dispatch(addAlert('Education removed', 'success'));

   }
   catch(err) {
      const { statusText, status } = err.response;

      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status: status }
      });
   }
}
// delete account
export const deleteAccount = () => async dispatch => {
   if(window.confirm('Are you absolutely sure? You CAN NOT restore your account!')) {
      try {
         await axios.delete(`/api/profile`);
   
         dispatch({ type: CLEAR_PROFILE });
         dispatch({ type: DELETE_ACCOUNT });
         dispatch(addAlert('Account permanently deleted'));
      }
      catch(err) {
         const { statusText, status } = err.response;

         dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: statusText, status: status }
         });
      }
   }
}
