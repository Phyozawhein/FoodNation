
import './App.module.css';
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Event from './components/Event/Event'
import { AuthProvider } from './context/AuthContext';
import Navbar from './layouts/navigation/Navbar';
import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Location from './components/Location/Location';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profile from './components/Profile/Profile';
import classes from './App.module.css';


function App() {

  return (
    <div className="App">
<<<<<<< HEAD
    <AuthProvider>
      <Router>
      
          <div className={classes.navbar}>
            <Navbar/>
          </div>
          <div>
          <Switch>
              <Route  path="/signup" component={SignUp}/>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Dashboard} />
              <PrivateRoute exact path ="/profile" component={Profile} />
              <Route path="/location" component={Location}/>
          </Switch>
          </div>

      </Router>
    </AuthProvider>
=======
    <Router>
      <AuthProvider>
        <Switch>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
            <Route exact path ="/" component={Dashboard}/>
            <Route path= "/event" component = {Event} />
          
            
        </Switch>
      </AuthProvider>
    </Router>
>>>>>>> d53ac51f20c288ef4ee564ec1f5d8e10cd4f80da
    </div>
  );
}

export default App;
