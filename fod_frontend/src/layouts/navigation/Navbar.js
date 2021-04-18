import React from 'react';
import {useAuth} from '../../context/AuthContext';
import classes from './Navbar.module.css';
import logo from '../../assets/FN-Logo.svg'
export default function Navbar() {
  return (
    <nav className={classes.navbarContainer}>
      <ul>
        <li>
          Home
        </li>
        <li>
          Find Help
        </li>
        <li>
          Profile
        </li>
        <li>
          <img src={logo} className={classes.logo} />
        </li>
        <li>
          Sign Up
        </li>
        <li>
          Log in
        </li>
        <li>
          Log out
        </li>
        <li>Contact Us</li>
      </ul>
    </nav>
  )
}
