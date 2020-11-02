import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { 
   REGISTER_SUCCESS, 
   REGISTER_FAILED,
   USER_LOADED,
   AUTH_ERROR
} from './types';

// load user
export const loadUser = () => async dispatch => {
   if(localStorage.token) {
      setAuthToken(localStorage.token);
   }
   try {
      const { data } = await axios.get('/api/auth');
      dispatch({
         type: USER_LOADED,
         payload: data
      });
   }
   catch(err) {
      dispatch({
         type: AUTH_ERROR
      });
   }
}

// register user
export const register = ({ name, email, password }) => async dispatch => {
   const body = { name, email, password };

   try {
      const { data } = await axios.post('/api/users', body); // data = webtoken 

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