import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { login } from '../features/auth/authSlice'


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
        console.log(user);
        console.log('login successful ' + user.name)
        navigate('/home')
      })
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
  )
}

export default Login