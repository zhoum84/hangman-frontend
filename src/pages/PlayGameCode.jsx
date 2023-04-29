import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import Game from "../components/Game"
import LoginFriend from "../components/loginFriend"
import { login } from "../features/auth/authSlice"
import { getScoreByGameId, viewPlayer } from "../features/hangman/HangmanSlice"
import { toast } from "react-toastify";


const PlayGameCode = () => {
  const {code} = useParams()
  const dispatch = useDispatch();

  const userLocalStorage = JSON.parse(localStorage.getItem("user"))
  const [word, setWord] = useState()
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [input, setInput] = useState('')
  const [friendScore, setFreindScore] = useState()


 
  //get user data
  const onSubmit = async (e) => {

    e.preventDefault()

    dispatch(login(input))
      .unwrap()
      .then(    toast(`Logged in as ${input}`, {
        type: "success",
        autoClose: 1500,
        position: "top-center"
      }))
      .then(setIsUserLoggedIn(true))
      .catch( err => {console.log(err)})
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const getWord = useCallback(() => {
    dispatch(viewPlayer(code))
      .unwrap()
      .then(data => setWord(data.word))
  }, [dispatch,code])

  useEffect(() => {
    getWord();
    if(userLocalStorage && !isUserLoggedIn){
      setIsUserLoggedIn(true)
    }
    dispatch(getScoreByGameId(code))
    .unwrap()
    .then(data => setFreindScore(data))
    // eslint-disable-next-line
  }, [getWord, dispatch]);



  return (
<>
      <div>
        {!isUserLoggedIn? (
        <div className="modal-dialog centered">
          <div className="modal-content siteImageButton">
            <div className="modal-header text-center">
              <button className="close" data-dismiss="modal">&times;</button>
              <LoginFriend onSubmit = {onSubmit} handleChange = {handleChange} input ={input} />
            </div>
          </div>
        </div>
        ): (
    
    <div>
      <div>
      <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#rulesModal">Game Rules</button>
      <div className="modal fade" id="rulesModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" data-dismiss="modal">&times;</button>
              <h4  >Rule of the game</h4>
            </div>
            <div className="modal-body">
              <p>Guess the letters in the word before you run out of guesses. You can guess one letter at a time. If the letter is in the word, it will be revealed. If not, you will lose a guess. You win the game by guessing all the letters in the word, and lose the game if you run out of guesses before guessing all the letters.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#leaderPlayerModal">Friend Leaderboard</button>
        <div className="modal fade" id="leaderPlayerModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" data-dismiss="modal">&times;</button>
                <h4  >Leaderboard</h4>
              </div>
              <div className="modal-body">
              {friendScore? 
              (friendScore.map(score => (
                  <li key={score.user}>{score.user_name} - {score.score}</li>
                    ))) : 
                  (<div>
                    <h5>Oops! No one played yet</h5>
                  </div>)}
               </div>
            <div className="modal-footer">
              <button className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      </div>
     </div>
      
      <Game word = {word} code ={code}/>
      </div>
      )}

    </div>
  </>
  )
}

export default PlayGameCode