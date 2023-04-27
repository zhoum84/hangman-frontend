import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";


// The login page. Just like last time.
const Login = (props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    //props.sendRequest(e.target.value)
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // may want to authenticate before setting username
    props.username(e.target[0].value);

    // dispatch(login(input))
    //   .unwrap()
    //   .then((user) => {
    //     navigate('/home')
    //   })
    //   .catch( err => {console.log(err)})
    navigate("/home");
  };

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Enter a username to continue</p>
      </section>

      <section className='form'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              value={input}
              onChange={handleChange}
              placeholder='Enter your username'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
