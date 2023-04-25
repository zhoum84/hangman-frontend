import React from 'react'
import { useNavigate } from 'react-router-dom'


const ShowWord = () => {
  
    const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  }  
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>finalMessage</h2>
        <h3>finalMessageRevealWord</h3>
        <button onClick={handleClick}>Return to home</button>
      </div>
    </div>
  )
}

export default ShowWord