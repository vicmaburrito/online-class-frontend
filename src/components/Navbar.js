import React from 'react';
import {
  Link,
} from 'react-router-dom';
import '../Styles/navbar.css';
import Header from './Header';

const Navbar = () => (
  <nav>
    <Header />
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/classes">Classes</Link></li>
      <li><Link to="/reservations">Reservations</Link></li>
    </ul>
  </nav>
);

export default Navbar;
