import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from 'react-modal';
import { useSelector } from "react-redux";

const Home = () => {

  const [score, useScore] = useState(0);
  const navigate = useNavigate();

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
        <h3>Press to start!</h3>
      </section>

      <h2>Your total score: {score}</h2>
      <button className="btn btn-blue-block" onClick={handleClick}>Play!</button>

      <button className="btn btn-center" onClick={openLeaderboard}>View Leaderboard</button>
    </>
  );
};

export default Home;
