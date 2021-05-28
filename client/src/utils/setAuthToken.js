import axios from 'axios';

const setAuthToken = token => {
   if(token) {
      // when logging in, registering and loading user
      axios.defaults.headers.common['auth-token'] = token;
      localStorage.setItem('token', token);
   }
   else {
      // when logging out, deleting account, auth error, register fail, loging fail
      delete axios.defaults.headers.common['auth-token'];
      localStorage.removeItem('token');
   }
}
export default setAuthToken;
