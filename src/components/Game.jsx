import { useState, useEffect, useCallback } from 'react'
import Gallows from './Gallows'
import IncorrectInputs from './IncorrectInputs'
import Word from './Word'
import EndGame from './EndGame'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { randomComputer } from '../features/hangman/HangmanSlice'

const Game = () => {
  const [selectedWord, setSelectedWord] = useState('')
  const [playable, setPlayable] = useState(true);
  const [correctInputs, setCorrectInputs] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const dispatch = useDispatch()
  const [guessedLetters, setGuessedLetters] = useState(new Set([]));

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
    setGuessedLetters(new Set([]));

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
        handleGuess(key.toLowerCase());
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctInputs, wrongLetters, playable]);

  const handleGuess = letter => {
    setGuessedLetters(new Set([...guessedLetters, letter]));
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
      <IncorrectInputs incorrectInputs={wrongLetters} />

        {/* <div className='game'>
          <h1>The Player</h1>
          <Gallows incorrectInputs={wrongLetters} />
          <IncorrectInputs incorrectInputs={wrongLetters} />
          <Word selectedWord={selectedWord} correctInputs={correctInputs} />
          <EndGame correctInputs={correctInputs} incorrectInputs={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div> */}
        {/* <div className="vertical-line"></div> */}
        <div className='game'>
          {/* <h1>The Computer</h1> */}
          <Gallows incorrectInputs={wrongLetters} />
          <Word selectedWord={selectedWord} correctInputs={correctInputs} />
          <EndGame correctInputs={correctInputs} incorrectInputs={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div>
      </div>
      <div style={{"margin-top": "50px"}}>
        <div className='row'>
          <button className={guessedLetters.has("q") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("q")}>Q</button>
          <button className={guessedLetters.has("w") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("w")}>W</button>
          <button className={guessedLetters.has("e") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("e")}>E</button>
          <button className={guessedLetters.has("r") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("r")}>R</button>
          <button className={ guessedLetters.has("t") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("t")}>T</button>
          <button className={guessedLetters.has("y") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("y")}>Y</button>
          <button className={guessedLetters.has("u") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("u")}>U</button>
          <button className={guessedLetters.has("i") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("i")}>I</button>
          <button className={guessedLetters.has("o") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("o")}>O</button>
          <button className={guessedLetters.has("p") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("p")}>P</button>
        </div>
        <div className='row'>
          <button className={guessedLetters.has("a") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("a")}>A</button>
          <button className={guessedLetters.has("s") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("s")}>S</button>
          <button className={guessedLetters.has("d") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("d")}>D</button>
          <button className={guessedLetters.has("f") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("f")}>F</button>
          <button className={guessedLetters.has("g") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("g")}>G</button>
          <button className={guessedLetters.has("h") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("h")}>H</button>
          <button className={guessedLetters.has("j") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("j")}>J</button>
          <button className={guessedLetters.has("k") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("k")}>K</button>
          <button className={guessedLetters.has("l") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("l")}>L</button>
        </div>
        <div className='row'>
          <button className={guessedLetters.has("z") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("z")}>Z</button>
          <button className={guessedLetters.has("x") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("x")}>X</button>
          <button className={guessedLetters.has("c") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("c")}>C</button>
          <button className={guessedLetters.has("v") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("v")}>V</button>
          <button className={guessedLetters.has("b") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("b")}>B</button>
          <button className={guessedLetters.has("n") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("n")}>N</button>
          <button className={guessedLetters.has("m") ? "selectedLetter" : "keyboard"} onClick={() => handleButtonClick("m")}>M</button>
        </div>
      </div>
    </>
  )
}

export default Game