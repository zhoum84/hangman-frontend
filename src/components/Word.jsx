
// Has the selected word and correct letters as props
// Splits the word then checks if the correct letters include it
const Word = ({selectedWord, correctInputs}) => {

  return (
        <div className="word">
      {selectedWord.split('').map((letter, i) => {
        return (
          <span className="letter" key={i}>
            {correctInputs.includes(letter) ? letter : ''}
          </span>
        )
      })}
    </div>

  )
}

export default Word