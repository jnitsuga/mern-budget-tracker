import React from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa'
import { useUserContext } from '../contexts/ContextProvider'
import Banner from '../components/Banner';

const Login = () => {
  const { inputUsername, setInputUsername, inputPassword, setInputPassword, loggedIn, setLoggedIn } = useUserContext();

  const login = async (e) => {
    e.preventDefault()

    Axios.post('http://localhost:4000/api/users/login', {
      username: inputUsername,
      password: inputPassword
    }).then(response => {
      toast(`Welcome, ${response.data.firstName}!`)
      setLoggedIn(`${response.data.firstName}`)
    })
  }

  return (
    <>
    <Banner header='/login' subHeader='Log In' />
    <div className='m-4 space-y-1.5'>
      {loggedIn ? null : 
      <>
        <p className='flex items-center font-bold'>
          <span><FaSignInAlt /></span>
          <span className='ml-1'>Log In</span>
        </p>

        <input 
          type='text' 
          placeholder='Username' 
          className='border-2 rounded block focus:outline-blue-400' 
          onChange={(e) => {setInputUsername(e.target.value)}} 
          required 
        />

        <input 
          type='password' 
          placeholder='Password' 
          className='border-2 rounded block focus:outline-blue-400' 
          onChange={(e) => {setInputPassword(e.target.value)}} 
          required 
        />

        <button 
          onClick={login}
          className = 'bg-gray-200 p-1 rounded drop-shadow-md hover:bg-blue-300'
        > 
          Log In
        </button>
      </>
      }
    </div>
    </>
  )
}

export default Login