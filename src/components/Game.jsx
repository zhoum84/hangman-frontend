import { useState, useEffect } from 'react'
import Gallows from './Gallows'
import IncorrectInputs from './IncorrectInputs'
import Word from './Word'
import EndGame from './EndGame'
import { ToastContainer, toast } from 'react-toastify';
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
  // 
  const playAgain = () =>{
    setPlayable(true);

    // Reset the game state
    setCorrectInputs([]);
    setWrongLetters([]);

    // select new word
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  const repeatLetter = () =>{
    console.log('lol');
    toast('You have already used this letter');
  }

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctInputs.includes(letter)) {
            setCorrectInputs(currentInputs => [...currentInputs, letter]);
          } else {
            // can't get this to work
            repeatLetter();
            <ToastContainer />
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentInputs => [...currentInputs, letter]);
          } else {
            
            // can't get this to work
            repeatLetter();
            <ToastContainer />
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctInputs, wrongLetters, playable]);


  return (
    <div className=''>
        <div className='game'>
          <h1>The Player</h1>
            <Gallows incorrectInputs={wrongLetters}/>
            <IncorrectInputs incorrectInputs={wrongLetters}/>
            <Word selectedWord={selectedWord} correctInputs={correctInputs}/>
            <EndGame correctInputs={correctInputs} incorrectInputs={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div>
        <div className="vertical-line"></div>
        <div className='game'>
          <h1>The Computer</h1>
            <Gallows incorrectInputs={wrongLetters}/>
            <IncorrectInputs incorrectInputs={wrongLetters}/>
            <Word selectedWord={selectedWord} correctInputs={correctInputs}/>
            <EndGame correctInputs={correctInputs} incorrectInputs={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div>
    </div>
    
  )
}

export default Game