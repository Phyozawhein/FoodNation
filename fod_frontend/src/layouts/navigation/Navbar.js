import React from 'react';
import {useAuth} from '../../context/AuthContext';
import classes from './Navbar.module.css';
import logo from '../../assets/FN-Logo.svg';
import {NavLink, useHistory} from "react-router-dom"
export default function Navbar() {
  const {currentUser,logout} = useAuth();
  const history = useHistory();

  async function handleLogout(){
   

    try{
        logout()
        history.push('/login')
    }
    catch{
        console.log('Failed to log out')
    }
}
  return (
    <nav className={classes.navbarContainer}>
      <ul>
        <div className={classes.leftBar}>
          <li className={classes.navlink}>
            <NavLink to='/'  activeClassName={classes.active} exact>
            Home
            </NavLink>
          </li>
          <li className={classes.navlink} >
            <NavLink to='/'  activeClassName={classes.active} exact>
            Find Help
            </NavLink>
          </li>
          { currentUser ?
          <li className={classes.navlink}> 
            <NavLink to='/profile'  activeClassName={classes.active} exact> 
              Profile
            </NavLink>
          </li>
          : null }
        </div>
        <li className={classes.navlink}>
          <NavLink to="/" >
          <img src={logo} className={classes.logo} alt="logo-pic" />
          </NavLink>
        </li>
        <div className={classes.rightBar}>
          {  currentUser !== null ? <> <li className={classes.navlink}> <NavLink to="/login"  onClick={handleLogout}> Log out </NavLink> </li></>: <><li className={classes.navlink}> <NavLink to='/signup'  activeClassName={classes.active} exact> Sign Up </NavLink> </li><li className={classes.navlink}> <NavLink to='/login' activeClassName={classes.active} exact> Login </NavLink>  </li></>}

          <li className={classes.navlink}><NavLink to='/'   activeClassName={classes.active} exact >Contact Us</NavLink></li>
        </div>
      </ul>
    </nav>
  )
}
