const IncorrectInputs = ({ incorrectInputs }) => {
  return (
    <>
      <div className="incorrect-inputs-container">
        <div>
          {incorrectInputs.length > 0 && <p>{ incorrectInputs.length} wrong guesses used: </p>}
          {incorrectInputs
            .map((letter, i) => <span key={i}>{letter}</span>)
            .reduce(
              (prev, curr) => (prev === null ? [curr] : [prev, ", ", curr]),
              null
          )}
          <p>{6 - incorrectInputs.length} wrong guesses left.</p>
        </div>
      </div>
    </>
  );
};

export default IncorrectInputs;
