import { useNavigate } from "react-router-dom";import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice.js'
import { useEffect, useState } from 'react';

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = JSON.parse(localStorage.getItem("user"));
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const [user, setUser] = useState();

  useEffect(()=>{
    if(username !== null){
      console.log(username)
    setUser(username.length? username[0].name : username.name);
    setIsUserLoggedIn(true)
  }},[setUser,username])
  

  const onPress = () =>{
    dispatch(logout());
    setUser('')
    setIsUserLoggedIn(false)
    navigate('/');
  }
  return (
    <header className='header'>
      <div className='logo'>
        {user?<Link to='/home'>Task Tracker </Link>: <Link to='/'>Task Tracker</Link>}
      </div>
      <div>
        {user}
      </div>
      <ul>
        <li>
          {!isUserLoggedIn ?
          <li>
            <Link to='/'>
              <FaSignInAlt /> Login
            </Link>
          </li>
          : <li>
              <button className='btn' onClick={onPress}> 
                <FaSignOutAlt /> Logout
              </button>
            </li>
           }

        </li>
      </ul>
    </header>
  )
}

export default Header