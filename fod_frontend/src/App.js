
import './App.module.css';
import SignUp from './components/SignUp/SignUp'
import {Container} from 'react-bootstrap';
import Login from './components/Login/Login'
import { AuthProvider } from './context/AuthContext';
import Navbar from './layouts/navigation/Navbar';
import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profile from './components/Profile/Profile';
import classes from './App.module.css';

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
            <Route exact path ="/" component={Dashboard}/>
            <Route exact path ="/profile" component={Profile}/>
            
        </Switch>
        </div>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
