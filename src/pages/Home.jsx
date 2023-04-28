import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from 'react-modal';
import { useSelector } from "react-redux";
import { useEffect, useCallback } from 'react';
import { useDispatch} from 'react-redux';
import { getTopScores } from '../features/hangman/HangmanSlice';

const Home = () => {

  const [score, useScore] = useState(0);
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

  // this should generate a random game
  const handleClick = () => {
    navigate('/playgame');
  }

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
      <button className="btn btn-blue-block purple" onClick={handleClick}>Play!</button>

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
    </>
  );
};

export default Home;
