import React from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { useUserContext } from '../contexts/ContextProvider'
import Navbar from '../components/Navbar';

const Login = () => {
  const { inputUsername, setInputUsername, inputPassword, setInputPassword, user, setUser } = useUserContext();

  const retrieveUserDetails = async (accessToken) => {
    // const options = {
    //   headers: {Authorization: `Bearer ${accessToken}`}
    // }

    await Axios.get('http://localhost:4000/api/users/me', {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(res => {
      setUser(res.data.firstName)
      // window.location="/"
    })
  }

  const login = async (e) => {
    e.preventDefault()

    try {
      await Axios.post('http://localhost:4000/api/users/login', {
        username: inputUsername,
        password: inputPassword
      }).then(res => {
        if(typeof res.data !== 'undefined') {
          localStorage.setItem('token', res.data.accessToken)
          retrieveUserDetails(res.data.accessToken)
          window.location='/'
          toast('Successfully logged in')
        } 
      })
    } catch (error) {
      toast(error)
      console.log(error)
    }
  }

  return (
    <>
    <Navbar header='/login' subHeader='Log In' />
    <div className='m-4 space-y-1.5'>
      {user ? null : 
      <>
        <p className='flex items-center font-bold text-gray-200'>
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