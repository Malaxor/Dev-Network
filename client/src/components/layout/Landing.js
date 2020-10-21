import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
   <section className="landing">
      <div className="landing--dark-overlay">
         <div className="landing__landing-inner">
            <h1 className="x-large">World Wide Devs</h1>
            <p className="lead">
               Create a profile, share posts, and get help from
               other developers
            </p>
            <div className="buttons">
               <Link to="/register" class="btn btn--primary">Sign Up</Link>
               <Link to="/login" class="btn btn--light">Login</Link>
            </div>
         </div>
      </div>
   </section>
);
export default Landing;