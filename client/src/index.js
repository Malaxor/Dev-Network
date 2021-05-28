import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk'; 
import reducers from './reducers';
import App from './App';
import setAuthToken from './utils/setAuthToken';

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)));
let currentState = store.getState();
// subscribe runs every time state changes
// we can compare previous state to current state and react to any changes in state
store.subscribe(() => {
   let previousState = currentState;
   currentState = store.getState();
   
   if(previousState.auth.token !== currentState.auth.token) {
      const { token } = currentState.auth;
      setAuthToken(token);
   }
});

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>, 
   document.getElementById('root')
);
