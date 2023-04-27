import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayGame from "./pages/PlayGame";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  const [user, setUser] = useState('');
  const sendRequest = (str) => { setUser(str); }
  //game needs to generate a link instead of going to /game

  return (
    <>
      <Router>
        <div className='container'>
          <Header user={user} />
          <Routes>
            <Route path='/' element={<Login user={user} sendRequest={sendRequest} />} />
            <Route path='/home' element={<Home user={user}/>} />
            <Route path='/playgame' element={<PlayGame />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </>
  );
}

export default App;
