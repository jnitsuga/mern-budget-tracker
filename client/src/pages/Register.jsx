import React from 'react'
import Axios from 'axios'

import { useUserContext } from '../contexts/ContextProvider'

const Register = () => {
  const { listOfUsers, setListOfUsers, firstName, setFirstName, lastName, setLastName, mobileNo, setMobileNo, email, setEmail, password, setPassword } = useUserContext();

  const createUser = () => {
    Axios.post('http://localhost:4000/createUser', {
      firstName,
      lastName,
      mobileNo,
      email,
      password,
    }).then((response) => {
      alert(`${firstName} ${lastName} succesfully created!`)
      setListOfUsers([...listOfUsers, {
        firstName,
        lastName,
        mobileNo,
        email,
        password,
      }])
    })
  };

  return (
    <div className='m-4 space-y-1.5'>
      <p className='font-bold'>Register</p>

      <input type='text' placeholder='First Name' className='border-2 block' onChange={(e) => {setFirstName(e.target.value)}} />

      <input type='text' placeholder='Last Name' className='border-2 block' onChange={(e) => {setLastName(e.target.value)}} />
      
      <input type='text' placeholder='Mobile No.' className='border-2 block' onChange={(e) => {setMobileNo(e.target.value)}} />

      <input type='text' placeholder='Email' className='border-2 block' onChange={(e) => {setEmail(e.target.value)}} />

      <input type='text' placeholder='Password' className='border-2 block' onChange={(e) => {setPassword(e.target.value)}} />

      <button 
        onClick={createUser}
        className = 'bg-gray-200 p-1 rounded drop-shadow-md hover:bg-green-200'
      > Create User 
      </button>

    </div>
  )
}

export default Register