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