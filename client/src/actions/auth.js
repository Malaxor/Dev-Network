import axios from '../api/axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAILED } from './types';

export const register = ({ name, email, password }) => async dispatch => {
   const body = { name, email, password };

   try {
      const { data } = await axios.post('/api/users', body);

      dispatch({
         type: REGISTER_SUCCESS,
         payload: data
      });
   }
   catch(err) {
      const errors = err.response.data.errors;
      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
         type: REGISTER_FAILED
      });
   }
} 