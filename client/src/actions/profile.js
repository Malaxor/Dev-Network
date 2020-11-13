import axios from 'axios';
import { setAlert } from './alert';
import {
   GET_PROFILE,
   PROFILE_ERROR
}
from './types';

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
         type: GET_PROFILE,
         payload: data
      });
      dispatch(setAlert(edit ? 'Profile updated.' : 'Profile created.', 'success'));

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