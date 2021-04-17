
import './App.module.css';
import SignUp from './components/SignUp/SignUp'
import {Container} from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div className="App">
        <Container className="d-felx align-items-center">
          <SignUp/>
        </Container>
    </div>
    </AuthProvider>
  );
}

export default App;
