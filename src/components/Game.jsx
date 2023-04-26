import { useState, useEffect } from 'react'
import Gallows from './Gallows'
import IncorrectInputs from './IncorrectInputs'
import Word from './Word'
import EndGame from './EndGame'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// currently hardcoded.
// right now it is global, or else a random word would be selected on each input
const words = ['word', 'javascript', 'lighthall', 'ihatereactredux', 'hello'];
let selectedWord = words[Math.floor(Math.random() * words.length)];


const Game = () => {

  const [playable, setPlayable] = useState(true);
  const [correctInputs, setCorrectInputs] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  // maybe just reload the page
  const playAgain = () => {
    setPlayable(true);

    // Reset the game state
    setCorrectInputs([]);
    setWrongLetters([]);

    // select new word
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  const repeatLetter = () => {
    toast("You've already guessed that letter, try another one!", {
      type: "info",
      autoClose: 2000,
      position: "top-center"
    });
  }

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        handleGuess(letter);
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctInputs, wrongLetters, playable]);

  const handleGuess = letter => {
    if (selectedWord.includes(letter)) {
      if (!correctInputs.includes(letter)) {
        setCorrectInputs(currentInputs => [...currentInputs, letter]);
      } else {
        repeatLetter();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters(currentInputs => [...currentInputs, letter]);
      } else {
        repeatLetter();
      }
    }
  };

  const handleButtonClick = letter => {
    handleGuess(letter);
  };

  return (
    <>
      <div className=''>
        <div className='game'>
          <h1>The Player</h1>
          <Gallows incorrectInputs={wrongLetters} />
          <IncorrectInputs incorrectInputs={wrongLetters} />
          <Word selectedWord={selectedWord} correctInputs={correctInputs} />
          <EndGame correctInputs={correctInputs} incorrectInputs={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div>
        <div className="vertical-line"></div>
        <div className='game'>
          <h1>The Computer</h1>
          <Gallows incorrectInputs={wrongLetters} />
          <IncorrectInputs incorrectInputs={wrongLetters} />
          <Word selectedWord={selectedWord} correctInputs={correctInputs} />
          <EndGame correctInputs={correctInputs} incorrectInputs={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div>
      </div>
      <div>
        <div className='row'>
          <button className="keyboard" onClick={() => handleButtonClick("Q")}>Q</button>
          <button className="keyboard" onClick={() => handleButtonClick("W")}>W</button>
          <button className="keyboard" onClick={() => handleButtonClick("E")}>E</button>
          <button className="keyboard" onClick={() => handleButtonClick("R")}>R</button>
          <button className="keyboard" onClick={() => handleButtonClick("T")}>T</button>
          <button className="keyboard" onClick={() => handleButtonClick("Y")}>Y</button>
          <button className="keyboard" onClick={() => handleButtonClick("U")}>U</button>
          <button className="keyboard" onClick={() => handleButtonClick("I")}>I</button>
          <button className="keyboard" onClick={() => handleButtonClick("O")}>O</button>
          <button className="keyboard" onClick={() => handleButtonClick("P")}>P</button>
        </div>
        <div className='row'>
          <button className="keyboard" onClick={() => handleButtonClick("A")}>A</button>
          <button className="keyboard" onClick={() => handleButtonClick("S")}>S</button>
          <button className="keyboard" onClick={() => handleButtonClick("D")}>D</button>
          <button className="keyboard" onClick={() => handleButtonClick("F")}>F</button>
          <button className="keyboard" onClick={() => handleButtonClick("G")}>G</button>
          <button className="keyboard" onClick={() => handleButtonClick("H")}>H</button>
          <button className="keyboard" onClick={() => handleButtonClick("J")}>J</button>
          <button className="keyboard" onClick={() => handleButtonClick("K")}>K</button>
          <button className="keyboard" onClick={() => handleButtonClick("L")}>L</button>
        </div>
        <div className='row'>
          <button className="keyboard" onClick={() => handleButtonClick("Z")}>Z</button>
          <button className="keyboard" onClick={() => handleButtonClick("X")}>X</button>
          <button className="keyboard" onClick={() => handleButtonClick("C")}>C</button>
          <button className="keyboard" onClick={() => handleButtonClick("V")}>V</button>
          <button className="keyboard" onClick={() => handleButtonClick("B")}>B</button>
          <button className="keyboard" onClick={() => handleButtonClick("N")}>N</button>
          <button className="keyboard" onClick={() => handleButtonClick("M")}>M</button>
        </div>
      </div>
    </>
  )
}

export default Game