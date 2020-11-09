import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { 
   REGISTER_SUCCESS, 
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGOUT,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   CLEAR_PROFILE
} from './types';

// load user
export const loadUser = () => async dispatch => {
   if(localStorage.token) {
      setAuthToken(localStorage.token);
   }
   try {
      const { data } = await axios.get('/api/auth'); // logged in user
      
      dispatch({
         type: USER_LOADED,
         payload: data
      }); 
   }
   catch(err) {
      dispatch({ type: AUTH_ERROR });
   }
}
// register user
export const register = ({ name, email, password }) => async dispatch => {
   try {
      const { data } = await axios.post('/api/users', { name, email, password }); // webtoken 
      
      dispatch({
         type: REGISTER_SUCCESS,
         payload: data
      });
      dispatch(loadUser());
   }
   catch(err) {
      const { errors } = err.response.data;
      
      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({ type: REGISTER_FAIL });
   }
}
// log in
export const login = formData => async dispatch => {
   const { data } = await axios.post('/api/auth', formData); // webtoken

   try {
      dispatch({
         type: LOGIN_SUCCESS,
         payload: data
      });
      dispatch(loadUser());
   } 
   catch(err) {
      const { errors } = err.response.data;

      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({ type: LOGIN_FAIL });
   }
}
// log out and clear profile
export const logout = () => async dispatch => {
   dispatch({ type: CLEAR_PROFILE });
   dispatch({ type: LOGOUT });
} 