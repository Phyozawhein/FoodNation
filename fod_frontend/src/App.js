
import './App.module.css';
import SignUp from './components/SignUp/SignUp'
import {Container} from 'react-bootstrap';
import Login from './components/Login/Login'
import { AuthProvider } from './context/AuthContext';
import Navbar from './layouts/navigation/Navbar';
import PrivateRoute from './PrivateRoute';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
      <AuthProvider>
        <div >
          <Navbar/>
        </div>
        <Switch>
            <Route  path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
            <PrivateRoute exact path ="/" component={Dashboard}/>
            
        </Switch>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
