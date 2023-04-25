import { useState } from 'react'
import Gallows from './Gallows'
import IncorrectInputs from './IncorrectInputs'
import Word from './Word'
import ShowWord from './ShowWord'

// needs to correspond with some random 5 digit code to share
// 
const Game = () => {

  const words = ['word', 'javascript', 'lighthall', 'ihatereactredux', 'hello'];
  let selectedWord = words[Math.floor(Math.random() * words.length)];


  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  return (
    <div className=''>
        <div className='game'>
            <Gallows/>
            <IncorrectInputs/>
            <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
            <ShowWord/>
        </div>
        <div class="vertical-line"></div>
        <div className='game'>
            <Gallows/>
            <IncorrectInputs/>
            <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
            <ShowWord/>
        </div>
    </div>
    
  )
}

export default Game