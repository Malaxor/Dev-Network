import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './index';
// components
import Navbar from './components/layout/Nav';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

import { loadUser } from './actions/auth';
import './styles/styles.scss';

const App = () => { 
   useEffect(() => {
      store.dispatch(loadUser());
   }, []);
   return (
      <Router>
         <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className='container'>
               <Alert />
               <Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
               </Switch>
            </section>
         </Fragment>
      </Router>
   );   
};
export default App;