import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Header = (props) => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const navigate = useNavigate();
  const handleLogout = () => {
    // dispatch(logout());
    // setUser('')
    // setIsUserLoggedIn(false)
    navigate("/");
  };
  return (

    <header className="header">
      <div className="title">Hangman!</div>
      <p>{props.username}</p>
      <ul>
        <li>
          <button className="btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
