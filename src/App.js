import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayGame from "./pages/PlayGame";

function App() {

  //game needs to generate a link instead of going to /game
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<Login/>} />      
            <Route path='/home' element={<Home/>} />   
            <Route path='/playgame' element={<PlayGame/>} />     
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
