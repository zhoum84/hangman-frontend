import { useNavigate } from "react-router-dom";
import { getTopScores } from '../features/hangman/HangmanSlice';
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlayer } from "../features/hangman/HangmanSlice";

const Home = () => {

  // const [score, useScore] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user.length? user[0].id :  user["id"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [topScores,setTopScores] =useState([])


  const getScores = useCallback(() => {
    dispatch(getTopScores())
      .unwrap()
      .then(data => {
        setTopScores(data)
        .then(console.log(data))
      })
      
  }, [dispatch]);

  useEffect(() => {
    getScores();
  }, [getScores]);
  const [isChallengingFriend, SetIsChallengingFriend] = useState(false);
  const [word, SetWord] = useState('')
  const [error, isError] = useState()
  const [errorStatus, setErrorStatus] = useState('')
  const nameRegex = /^[A-Za-z\s]+$/;
  const [code, setCode] = useState()
  const codeValue = useSelector(state =>   state.hangman.players.length? state.hangman.players[0].data.id : null)
  const frontUrl = process.env.APP_URL;

  console.log("URL ius: ",frontUrl)



  // this should generate a random game
  const handleClickPlay = () => {
    navigate('/playgame');
  }

  const handleWordChange = (word) => {
    SetWord(word)

    if (!nameRegex.test(word)){
      isError(true)
      setErrorStatus("Word must be a string")
    } else if (word === ''){
      setErrorStatus('Please Enter a word')
      isError(true)
    } else {
      isError(false)
    }
  }

  const handleSubmit = () => {
    const data={
      user: userId,
      word
    }
    dispatch(createPlayer(data))
    SetIsChallengingFriend(true)
  }


  useEffect(()=>{
    if (isChallengingFriend && codeValue){
    setCode(codeValue)
    }
  },[setCode, isChallengingFriend, codeValue])



  // open a modal?
  const openLeaderboard = () => {

  }

  return (
    <>
      <section className="heading">
        <h1>Welcome to Hangman</h1>
        {/* <h3>Press to start!</h3> */}
      </section>

      {/* <h2>Your total score: {score}</h2> */}
      <button className="btn btn-blue-block" onClick={handleClickPlay}>Play!</button>
      <button className="btn btn-blue-block" data-toggle="modal" data-target="#rulesModal">Challenge a Friend</button>
      <div className="modal fade" id="rulesModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" data-dismiss="modal">&times;</button>
              <h4  >Challenge A Friend</h4>
            </div>
            <div className="modal-body">
              {isChallengingFriend ? 
              (<div>
                <h5>Here is your sharable link: </h5>
                <a href={`playgame/${code}`}>{`${frontUrl}playgame/${code}`}</a>
              </div>)
              :(
              <div>
              <h5>Enter the Word: </h5>
              <textarea type="text" 
              name="word" 
              className='form-control' 
              value={word} 
              onChange={(e) => handleWordChange(e.target.value)} /> 
              </div>
              )}
              {error && (<div className="error"><h6>{errorStatus}</h6></div>)}
            </div>
            <div className="modal-footer">
              {!isChallengingFriend && (<button className="btn btn-default" disabled={error} onClick={handleSubmit}>Submit</button>)}
              <button className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>

      <button className="btn btn-center" data-toggle="modal" data-target="#rulesModal">View Leaderboard!</button>
      <div className="modal fade" id="rulesModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" data-dismiss="modal">&times;</button>
              <h4 >Leaderboard</h4>
            </div>
            <div className="modal-body">
              <div>
                <ul>
                {topScores.map(score => (
                <li key={score.user}>{score.user_name} - {score.score}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
