import { combineReducers } from 'redux';
import alertsReducer from './alerts';
import authReducer from './auth';
import profileReducer from './profile';

export default combineReducers({
   alerts: alertsReducer,
   auth: authReducer,
   profile: profileReducer
});