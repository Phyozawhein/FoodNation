
import './App.module.css';
import SignUp from './components/SignUp/SignUp'
import {Container} from 'react-bootstrap';
import Login from './components/Login/Login'
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard/Dashboard';
import Location from './components/Location/Location';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Router>
      <AuthProvider>
        <Switch>
            <Route  path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
            <Route path="/location" component={Location}/>
            <Route exact path ="/" component={Dashboard}/>
            
        </Switch>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
