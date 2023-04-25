import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EndGame = ({
  correctInputs,
  incorrectInputs,
  selectedWord,
  setPlayable,
  playAgain
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };

  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;


  // On every input, check if the user has won or lost
  // State corresponds with win/lose/continue
  
  let state = true;

  // if the correct inputs do not contain all the word letters,
  // set state to nothing
  selectedWord.split("").forEach((letter) => {
    if (!correctInputs.includes(letter)) {
      state = '';
    }
  });

  // end the game if the player has guessed incorrectly 6 times
  if (incorrectInputs.length === 6) state = false;

  if (state === true) {
    finalMessage = "You win!";
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
        <button className='btn btn-blue' onClick={playAgain}>Play again</button>
        <button className='btn' onClick={handleClick}>Return to home</button>
      </div>
    </div>
  );
};

export default EndGame;
