
import './App.module.css';
import SignUp from './components/SignUp/SignUp'
import {Container} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="appHeader">

      </header>
        <Container className="d-felx align-items-center">
          <SignUp/>
        </Container>
    </div>
  );
}

export default App;
