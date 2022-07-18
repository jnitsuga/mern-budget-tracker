import React, { useState } from 'react'
// import Axios from 'axios'

import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {

  const [formData, setFormData] = useState({
    inputUsername: '',
    inputPassword: '',
  })

  const {inputUsername, inputPassword } = formData;
  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const login = async (e) => {
    e.preventDefault()

  }

  return (
    <div className='m-4 space-y-1.5'>
      <section className="form">

        <form onSubmit={login}>
          <p className='flex items-center justify-center font-bold m-2'>
            <span><FaSignInAlt /></span>
            <span className='ml-1'>Log In</span>
          </p>
       
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id='inputUsername' 
              name='inputUsername'
              placeholder='Username' 
              value={inputUsername} 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id='inputPassword' 
              name='inputPassword'
              placeholder='Password' 
              value={inputPassword} 
              onChange={onChange}
            />
          </div>


          <div className="form-group">
            <button 
              type="submit" 
              className='btn btn-block bg-slate-400'
            >
              Submit
            </button>
          </div>
        </form>

      </section>
    </div>
  )
}

export default Login