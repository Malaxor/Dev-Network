import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ addAlert, register, isAuthenticated }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   });
   const { name, email, password, password2 } = formData;
   
   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   }   
   const onSubmit = e => {
      e.preventDefault();
      if(password !== password2) {
         addAlert("Passwords don't match", "danger");
      } 
      else {
         register({ name, email, password });
      }
   }

   if(isAuthenticated) {
      return <Redirect to="/dashboard"></Redirect>;
   }
   return (
      <Fragment>
         <h1 className="large text-primary">Sign Up</h1>
         <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
         <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
               <input 
                  type="text" 
                  placeholder="Name" 
                  name="name"
                  value={name}
                  onChange={onChange} 
                  required 
               />
            </div>
            <div className="form-group">
               <input 
                  type="email" 
                  placeholder="Email Address" 
                  name="email"
                  value={email}
                  onChange={onChange} 
               />
               <small className="form-smallText">
                  If you want a profile image, use a
                  Gravatar email.
               </small>
            </div>
            <div className="form-group">
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={onChange} 
               />
            </div>
            <div className="form-group">
               <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  minLength="6"
                  value={password2}
                  onChange={onChange} 
               />
            </div>
            <input type="submit" className="btn btn--primary" value="Register" />
         </form>
         <p className="my-8">
            Already have an account? <Link to='/login'>Sign In</Link>
         </p>
      </Fragment>
   );   
}
const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });
export default connect(mapStateToProps, { addAlert, register })(Register);
