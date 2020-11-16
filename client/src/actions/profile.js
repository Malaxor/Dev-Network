import axios from 'axios';
import { setAlert } from './alert';
import {
   GET_PROFILE,
   CREATE_PROFILE,
   UPDATE_PROFILE,
   PROFILE_ERROR
}
from './types';

// get profile
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
         payload: { msg: statusText, status }
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
      dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

      if(!edit) {
         history.push('/dashboard');
      }
   } 
   catch(err) {
      const { statusText, status, data: { errors } } = err.response;

      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status }
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
      dispatch(setAlert('Experience added', 'success'));
      history.push('/dashboard');
   } 
   catch(err) {
      const { statusText, status, data: { errors } } = err.response;

      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status }
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
      dispatch(setAlert('Education added', 'success'));
      history.push('/dashboard');
   } 
   catch(err) {
      const { statusText, status, data: { errors } } = err.response;

      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: statusText, status }
      });
   }
}  