import { ADD_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuid } from 'uuid';

export const addAlert = (msg, alertType, time = 5000) => dispatch => {
   const id = uuid(); // random id
   dispatch({
      type: ADD_ALERT,
      payload: { msg, alertType, id }
   });
   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), time); // remove alert after 5 seconds
}