import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayGame from "./pages/PlayGame";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  const [username, setUsername] = useState('');
  const getUsername = (e) => {
    setUsername(e);
  }
  //game needs to generate a link instead of going to /game
  return (
    <>
      <Router>
        <div className='container'>
          <Header username={username} />
          <Routes>
            <Route path='/' element={<Login username={(e) => getUsername(e)} />} />
            <Route path='/home' element={<Home />} />
            <Route path='/playgame' element={<PlayGame />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
