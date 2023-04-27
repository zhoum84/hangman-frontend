import { useState, useEffect, useCallback } from 'react'
import Gallows from './Gallows'
import IncorrectInputs from './IncorrectInputs'
import Word from './Word'
import EndGame from './EndGame'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { randomComputer } from '../features/hangman/HangmanSlice'




// currently hardcoded.
// right now it is global, or else a random word would be selected on each input
const words = ['word', 'javascript', 'lighthall', 'ihatereactredux', 'hello'];
// let selectedWord = words[Math.floor(Math.random() * words.length)];




const Game = () => {
  const[selectedWord,setSelectedWord] =useState('')
  const [playable, setPlayable] = useState(true);
  const [correctInputs, setCorrectInputs] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const dispatch = useDispatch()

  const getWord = useCallback(() => {
    dispatch(randomComputer())
      .unwrap()
      .then(data => setSelectedWord(data.word))
  }, [dispatch])
  
  useEffect(() => {
    getWord();
  }, [getWord]);
  
  useEffect(() => {
    console.log('word:', selectedWord);
  }, [selectedWord]);
  // maybe just reload the page
  const playAgain = () => {
    setPlayable(true);
    getWord()
    // Reset the game state
    setCorrectInputs([]);
    setWrongLetters([]);

    // select new word
 
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
          <button className="keyboard" onClick={() => handleButtonClick("q")}>Q</button>
          <button className="keyboard" onClick={() => handleButtonClick("w")}>W</button>
          <button className="keyboard" onClick={() => handleButtonClick("e")}>E</button>
          <button className="keyboard" onClick={() => handleButtonClick("r")}>R</button>
          <button className="keyboard" onClick={() => handleButtonClick("t")}>T</button>
          <button className="keyboard" onClick={() => handleButtonClick("y")}>Y</button>
          <button className="keyboard" onClick={() => handleButtonClick("u")}>U</button>
          <button className="keyboard" onClick={() => handleButtonClick("i")}>I</button>
          <button className="keyboard" onClick={() => handleButtonClick("o")}>O</button>
          <button className="keyboard" onClick={() => handleButtonClick("p")}>P</button>
        </div>
        <div className='row'>
          <button className="keyboard" onClick={() => handleButtonClick("a")}>A</button>
          <button className="keyboard" onClick={() => handleButtonClick("s")}>S</button>
          <button className="keyboard" onClick={() => handleButtonClick("d")}>D</button>
          <button className="keyboard" onClick={() => handleButtonClick("f")}>F</button>
          <button className="keyboard" onClick={() => handleButtonClick("g")}>G</button>
          <button className="keyboard" onClick={() => handleButtonClick("h")}>H</button>
          <button className="keyboard" onClick={() => handleButtonClick("j")}>J</button>
          <button className="keyboard" onClick={() => handleButtonClick("k")}>K</button>
          <button className="keyboard" onClick={() => handleButtonClick("l")}>L</button>
        </div>
        <div className='row'>
          <button className="keyboard" onClick={() => handleButtonClick("z")}>Z</button>
          <button className="keyboard" onClick={() => handleButtonClick("x")}>X</button>
          <button className="keyboard" onClick={() => handleButtonClick("c")}>C</button>
          <button className="keyboard" onClick={() => handleButtonClick("v")}>V</button>
          <button className="keyboard" onClick={() => handleButtonClick("b")}>B</button>
          <button className="keyboard" onClick={() => handleButtonClick("n")}>N</button>
          <button className="keyboard" onClick={() => handleButtonClick("m")}>M</button>
        </div>
      </div>
    </>
  )
}

export default Game