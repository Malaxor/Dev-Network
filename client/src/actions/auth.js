import axios from 'axios';
import { addAlert } from './alert';
import { 
   REGISTER_SUCCESS, 
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGOUT,
   LOGIN_SUCCESS,
   LOGIN_FAIL
} from './types';

// register user
export const register = ({ name, email, password }) => async dispatch => {
   try {
      const { data } = await axios.post('/api/users', { name, email, password }); // data is an object with a property named token
      
      dispatch({
         type: REGISTER_SUCCESS,
         payload: data
      });
      dispatch(loadUser());
   }
   catch(err) {
      const { errors } = err.response.data;
      
      if(errors) {
         errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
      }
      dispatch({ type: REGISTER_FAIL });
   }
}
// log in
export const login = formData => async dispatch => {
   try {
      const { data } = await axios.post('/api/auth', formData); // data is an object with a property named token

      dispatch({
         type: LOGIN_SUCCESS,
         payload: data
      });
      dispatch(loadUser());
   } 
   catch(err) {
      const { errors } = err.response.data;

      if(errors) {
         errors.forEach(error => dispatch(addAlert(error.msg, 'danger')));
      }
      dispatch({ type: LOGIN_FAIL });
   }
}
// load user
export const loadUser = () => async dispatch => {
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
// log out and clear profile
export const logout = () => async dispatch => {
   dispatch({ type: LOGOUT });
} 
