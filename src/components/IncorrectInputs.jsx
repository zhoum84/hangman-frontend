const IncorrectInputs = ({ incorrectInputs }) => {
  const len = incorrectInputs.length;
  return (
    <div className="incorrect-inputs-container">
      <div>
        {len > 0 && <p>{len} wrong guesses: {incorrectInputs.join(', ')}</p>}
        <p>{6 - len} wrong guesses left.</p>
      </div>
    </div>
  );
};

export default IncorrectInputs;
