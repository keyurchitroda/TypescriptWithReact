import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Auth/Signup/Signup';
import Home from './components/Home/Home';
import Signin from './components/Auth/Signin/Signin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route  path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
