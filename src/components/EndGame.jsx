import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addScore } from '../features/hangman/HangmanSlice'
import { useDispatch } from 'react-redux'

const EndGame = ({
  correctInputs,
  incorrectInputs,
  selectedWord,
  setPlayable,
  playAgain,
  totalScore,
  currentWordValue,
  score,
  playNext,
  code,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
    handleAddScore();
  };
  const dispatch = useDispatch()
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;
  const user = JSON.parse(localStorage.getItem("user"))
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();

  useEffect(()=>{
    if(user){
      setUserId(user.length? user[0].id :  user["id"]);
      setUsername(user.length? user[0].name :  user["name"]);
    }
  },[userId, username, user])
 
  
  let state = true;

  selectedWord.split("").forEach((letter) => {
    if (!correctInputs.includes(letter)) {
      state = '';
    }
  });

  if (incorrectInputs.length === 6){ 
    state = false 
  }

  const handleAddScore = () => {
    const finalScore = totalScore + score;
    const finalScoreComplete = finalScore * 100
    const scoreData = { user_name: username, score: finalScoreComplete, user: userId , game_code: code}; 
    dispatch(addScore(scoreData));
  };

  if (state === true) {
    finalMessage = "You win! Play more to keep adding to your score.";
    playable = false;
  } else if (state === false) {
    finalMessage = "You lose! The correct word was " + selectedWord;
    playable = false;
    
  }

  useEffect(() => setPlayable(playable));

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        {state === true ? <button className='btn btn-blue' onClick={playNext}>Play next</button> : <button className='btn btn-blue' onClick={playAgain}>Play Again</button>}
        <button className='btn' onClick={handleClick}>Submit Score</button>
      </div>
    </div>
  );
};

export default EndGame;
