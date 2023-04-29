import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice.js'
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const [user, setUser] = useState();

  useEffect(()=>{
    const username = JSON.parse(localStorage.getItem("user"));
    if(username){
    setUser(username.length? username[0].name : username.name);
    setIsUserLoggedIn(true)
  }})
  

  const onPress = () =>{
    dispatch(logout());
    setUser('')
    setIsUserLoggedIn(false)
    navigate('/');
    toast(`Logged out ${user}`, {
      type: "warning",
      autoClose: 1500,
      position: "top-center"
    });
  }
  return (
    <header className='header'>
      <div className='logo'>
        <Link classame ='link'to={isUserLoggedIn? '/home' : '/'}>Hangman! </Link>
      </div>
      <div>
        {user}
      </div>
      <ul>
          {!isUserLoggedIn ?
          <li>
            <Link to='/'>
              <FaSignInAlt /> Login
            </Link>
          </li>
          : <li>
              <button className='btn hovPurp' onClick={onPress}> 
                <FaSignOutAlt /> Logout
              </button>
            </li>
           }
      </ul>
    </header>
  )
}

export default Header
