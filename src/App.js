
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
import CharityDetails from './components/CharityDetails/CharityDetails';
import Donation from './components/Donation/Donation';
import AppointmentList from './components/AppointmentList/AppointmentList';

function App() {

  return (
    <div className="App">
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
              <PrivateRoute exact path ="/profile" component={Profile}/>
              <Route path="/location" component={Location}/>
              <Route path="/charity/:id" children={<CharityDetails />}/>
              <PrivateRoute path ="/charity-event" component={Event} />
              <PrivateRoute path ="/restaurant-donation" component={Donation} />
              <PrivateRoute path ="/appointments" component={AppointmentList} />
          </Switch>
          </div>

      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
