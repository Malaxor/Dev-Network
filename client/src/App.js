import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Nav';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './styles/styles.scss';

const App = () => (
   <Router>
      <Fragment>
         <Navbar />
         <Route exact path="/" component={Landing} />
         <section className='container'>
            <Alert />
            <Switch>
               <Route exact path="/register" component={Register} />
               <Route exact path="/login" component={Login} />
            </Switch>
         </section>
      </Fragment>
   </Router>
);
export default App;