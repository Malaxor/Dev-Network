import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
   const [ formData, setFormData ] = useState({
      email: '',
      password: '',
   });
   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   } 
   const onSubmit = e => {
      e.preventDefault();
      console.log('hello');
   } 
   const { email, password } = formData;

   return (
      <Fragment>
         <h1 className="large text-primary">Sign In</h1>
         <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
         <form className="form" onSubmit={e => onSubmit(e)}>
         <div className="form-group">
            <input 
               type="email" 
               placeholder="Email Address" 
               name="email"
               value={email}
               onChange={e => onChange(e)} 
            />
         </div>
         <div className="form-group">
            <input
               type="password"
               placeholder="Password"
               name="password"
               minLength="6"
               value={password}
               onChange={e => onChange(e)} 
            />
         </div>
         <input type="submit" className="btn btn--primary" value="Register" />
         </form>
         <p className="my-8">
            Don't have an account? <Link to='/login'>Register</Link>
         </p>
      </Fragment>
   );   
};
export default Login;