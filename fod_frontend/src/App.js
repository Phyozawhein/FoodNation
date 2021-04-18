
import './App.module.css';
import SignUp from './components/SignUp/SignUp'
import {Container} from 'react-bootstrap';
import Login from './components/Login/Login'
import { AuthProvider } from './context/AuthContext';
import Navbar from './layouts/navigation/Navbar';
import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
<<<<<<< HEAD
import classes from './App.module.css';
=======
import Profile from './components/Profile/Profile';
>>>>>>> 3463a00307a95bc1b057953f79d421df62337b02

function App() {
  return (
    <div className="App">
    <Router>
      <AuthProvider>
        <div className={classes.navbar}>
          <Navbar/>
        </div>
        <div>
        <Switch>
            <Route  path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
<<<<<<< HEAD
            <PrivateRoute exact path="/" component={Dashboard}/>
=======
            <Route exact path ="/" component={Dashboard}/>
            <Route exact path ="/profile" component={Profile}/>
            
>>>>>>> 3463a00307a95bc1b057953f79d421df62337b02
        </Switch>
        </div>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
