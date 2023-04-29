import { FaSignInAlt } from 'react-icons/fa'


function LoginFriend(props) {


  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please enter your name to continue</p>
      </section>

      <section className='form'>
        <form onSubmit={props.onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              value={props.input}
              onChange={props.handleChange}
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

export default LoginFriend
