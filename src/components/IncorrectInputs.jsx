const IncorrectInputs = ({ incorrectInputs }) => {
  return (
    <>
      <div className="incorrect-inputs-container">
        <div>
          {incorrectInputs.length > 0 && <p>{ incorrectInputs.length} Wrong Guesses:</p>}
          {incorrectInputs
            .map((letter, i) => <span key={i}>{letter}</span>)
            .reduce(
              (prev, curr) => (prev === null ? [curr] : [prev, ", ", curr]),
              null
            )}
        </div>
      </div>
    </>
  );
};

export default IncorrectInputs;
