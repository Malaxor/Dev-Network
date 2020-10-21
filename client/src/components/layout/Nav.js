import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
   <nav className="navbar bg--dark">
      <h1>
         <Link to="/"><i class="fas fa-globe"></i> World Wide Devs</Link>
      </h1>
      <ul>
         <li><Link to="/profiles">Devs</Link></li>
         <li><Link to="/register">Register</Link></li>
         <li><Link to="/login">Login</Link></li>
      </ul>
   </nav>
);
export default Navbar;