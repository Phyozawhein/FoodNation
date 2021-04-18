
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
import Profile from './components/Profile/Profile';
=======
import classes from './App.module.css';
>>>>>>> 0d1c1552edf05750572d05e24a3f1a3497fbb00e

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
            <Route exact path ="/" component={Dashboard}/>
            <Route exact path ="/profile" component={Profile}/>
            
=======
            <PrivateRoute exact path="/" component={Dashboard}/>
>>>>>>> 0d1c1552edf05750572d05e24a3f1a3497fbb00e
        </Switch>
        </div>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
