import { combineReducers } from 'redux';
import alertsReducer from './alerts';
import authReducer from './auth';

export default combineReducers({
   alerts: alertsReducer,
   auth: authReducer
});