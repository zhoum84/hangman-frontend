import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const onPress = () => {
    // dispatch(logout());
    // setUser('')
    // setIsUserLoggedIn(false)
    navigate("/");
  };
  return (
    
    <header className="header">
      <div className="title">Hangman!</div>
      <ul>
        <li>
          <button className="btn" onClick={onPress}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
