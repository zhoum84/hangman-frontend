import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { login } from '../features/auth/authSlice'
import { toast } from "react-toastify";


function Login(props) {
  const [input, setInput] = useState('')
 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    props.sendRequest(e.target.value)
    setInput(e.target.value)
  }

  //get user data
  const onSubmit = async (e) => {
    e.preventDefault()

    dispatch(login(input))
      .unwrap()
      .then((user) => {
        navigate('/home')
      })
      .then(    toast(`Logged in as ${props.user}`, {
        type: "success",
        autoClose: 1500,
        position: "top-center"
      }))
      .catch( err => {console.log(err)})
  }



  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please enter your name to continue</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
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
  )
}

export default Login
