import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa'
import { useUserContext } from '../contexts/ContextProvider'
import Navbar from '../components/Navbar';

const Register = () => {
  const { 
    listOfUsers,
    setListOfUsers,
    inputFirstName,
    setInputFirstName,
    inputLastName,
    setInputLastName,
    inputUsername,
    setInputUsername,
    inputPassword,
    setInputPassword,
    inputPassword2,
    setInputPassword2,
    inputEmail,
    setInputEmail,
    inputMobileNo,
    setInputMobileNo,
    loggedIn, 
  } = useUserContext();

  const navigate = useNavigate();
  
  const registerUser = async (e) => {
    e.preventDefault()

    await Axios.post('http://localhost:4000/api/users/username-exists', {
      username: inputUsername
    }).then((res) => {
      if(res.data === false) {
        if(inputPassword !== inputPassword2) {
          toast('Passwords do not match!')
        } else {
          Axios.post('http://localhost:4000/api/users/register', {
            firstName: inputFirstName,
            lastName: inputLastName,
            username: inputUsername,
            password: inputPassword,
            email: inputEmail,
            mobileNo: inputMobileNo,
          })
          .then((res) => {
            if(res) {
              setListOfUsers([...listOfUsers, {
                firstName: inputFirstName,
                lastName: inputLastName,
                username: inputUsername,
                password: inputPassword,
                email: inputEmail,
                mobileNo: inputMobileNo,
              }])
              navigate('/login')
              toast(`User ${inputFirstName} successfully registered!`)
            }
          })
        }
      } else {
        toast('Username already exists!')
      }
    })
  }

  return (
    <>
    <Navbar header='/register' subHeader='Register' />
    <div className='m-4 space-y-1.5'>

      {loggedIn ? null : 
        <>
        <p className='flex items-center font-bold text-gray-200'>
          <span><FaUser /></span>
          <span className='ml-1'>Register</span>
        </p>
  
        <input 
          type='text' 
          placeholder='First Name' 
          className='border-2 rounded block focus:outline-blue-400' 
          onChange={(e) => {setInputFirstName(e.target.value)}} 
          required 
        />
  
        <input 
          type='text' 
          placeholder='Last Name' 
          className='border-2 rounded block focus:outline-blue-400' 
          onChange={(e) => {setInputLastName(e.target.value)}} 
          required />
  
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
        
        <input 
          type='password' 
          placeholder='Confirm Password' 
          className='border-2 rounded block focus:outline-blue-400' 
          onChange={(e) => {setInputPassword2(e.target.value)}} 
          required 
        />
  
        <input 
          type='text' 
          placeholder='Email (optional)' 
          className='border-2 rounded block focus:outline-blue-400' 
          onChange={(e) => {setInputEmail(e.target.value)}} 
        />
        
        <input 
          type='text' 
          placeholder='Mobile No. (optional)' 
          className='border-2 rounded block focus:outline-blue-400' 
          onChange={(e) => {setInputMobileNo(e.target.value)}} 
        />
  
        <button 
          onClick={registerUser}
          className = 'bg-gray-200 p-1 rounded drop-shadow-md hover:bg-blue-300'
        > 
          Create User 
        </button>
        </>
      }
    </div>
    </>
  )
}

export default Register