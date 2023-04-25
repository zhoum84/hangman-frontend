// Hangman design. Changes based on incorrect letters
const Gallows = ({ incorrectInputs }) => {
  const count = incorrectInputs.length;
  return (
    <div className="wrapper">
      <div className="bottom"></div>
      <div className="top"></div>
      <div className="support"></div>
      <div className="noose"></div>

      {count > 0 && <div className="head"></div>}
      {count > 1 && <div className="torso"></div>}
      {count > 2 && <div className="leftarm"></div>}
      {count > 3 && <div className="rightarm"></div>}
      {count > 4 && <div className="leftleg"></div>}
      {count > 5 && <div className="rightleg"></div>}
    </div>
  );
};

export default Gallows;
