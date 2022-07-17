import React, { useState } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify';

import { FaUser } from 'react-icons/fa'

import { useUserContext } from '../contexts/ContextProvider'

const Register = () => {
  const { listOfUsers, setListOfUsers, firstName, setFirstName, lastName, setLastName, username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, email, setEmail, mobileNo, setMobileNo } = useUserContext();
  
  const [formData, setFormData] = useState({
    inputFirstName: '',
    inputLastName: '',
    inputUsername: '',
    inputPassword: '',
    inputPassword2: '',
    inputEmail: '',
    inputMobileNo: '',
  })

  const { inputFirstName, inputLastName, inputUsername, inputPassword, inputPassword2, inputEmail, inputMobileNo } = formData;
  
  // register user method 1
  const createUser = (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      toast('Passwords do not match!')
    } else {
      Axios.post('http://localhost:4000/api/users/registerUser', {
      firstName,
      lastName,
      username,
      password,
      mobileNo,
      email,
    }).then((response) => {
      setListOfUsers([...listOfUsers, {
        firstName,
        lastName,
        username,
        password,
        mobileNo,
        email,
      }])
      toast(`User ${inputFirstName} successfully registered!`)
    })
    }
  };

  // register user method 2
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(inputPassword !== inputPassword2) {
      toast('Passwords do not match!')
    } else {
      Axios.post('http://localhost:4000/api/users/registerUser', {
        firstName: inputFirstName,
        lastName: inputLastName,
        username: inputUsername,
        password: inputPassword,
        email: inputEmail,
        mobileNo: inputMobileNo,
      }).then((response) => {
        setListOfUsers([...listOfUsers, {
          firstName: inputFirstName,
          lastName: inputLastName,
          username: inputUsername,
          password: inputPassword,
          email: inputEmail,
          mobileNo: inputMobileNo,
        }])
        toast(`User ${inputFirstName} successfully registered!`)
      })
    }
  }

  return (
    <div className='m-4 space-y-1.5'>
      {/* form version 2 */}
      <section className="form">
        <form onSubmit={onSubmit}>
          <p className='flex items-center justify-center font-bold m-2'>
            <span><FaUser /></span>
            <span className='ml-1'>Register</span>
          </p>

          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id='inputFirstName' 
              name='inputFirstName'
              placeholder='First Name' 
              value={inputFirstName} 
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id='inputLastName' 
              name='inputLastName'
              placeholder='Last Name' 
              value={inputLastName} 
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id='inputUsername' 
              name='inputUsername'
              placeholder='Username' 
              value={inputUsername} 
              onChange={onChange}
              required
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
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id='inputPassword2' 
              name='inputPassword2'
              placeholder='Confirm Password' 
              value={inputPassword2} 
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id='inputEmail' 
              name='inputEmail'
              placeholder='Email (optional)' 
              value={inputEmail} 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id='inputMobileNo' 
              name='inputMobileNo'
              placeholder='Mobile No. (optional)' 
              value={inputMobileNo} 
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button 
              type="submit" 
              className='btn btn-block bg-slate-400' 
              onClick={onSubmit}
            >Submit</button>
          </div>
        </form>
      </section>




      {/* form version 1 */}
      <p className='flex items-center font-bold'>
        <span><FaUser /></span>
        <span className='ml-1'>Register</span>
      </p>

      <input type='text' placeholder='First Name' className='border-2 rounded block focus:outline-blue-400' onChange={(e) => {setFirstName(e.target.value)}} required />

      <input type='text' placeholder='Last Name' className='border-2 rounded block focus:outline-blue-400' onChange={(e) => {setLastName(e.target.value)}} required />

      <input type='text' placeholder='Username' className='border-2 rounded block focus:outline-blue-400' onChange={(e) => {setUsername(e.target.value)}} required />

      <input type='password' placeholder='Password' className='border-2 rounded block focus:outline-blue-400' onChange={(e) => {setPassword(e.target.value)}} required />
      
      <input type='password' placeholder='Confirm Password' className='border-2 rounded block focus:outline-blue-400' onChange={(e) => {setConfirmPassword(e.target.value)}} required />

      <input type='text' placeholder='Email (optional)' className='border-2 rounded block focus:outline-blue-400' onChange={(e) => {setEmail(e.target.value)}} />
      
      <input type='text' placeholder='Mobile No. (optional)' className='border-2 rounded block focus:outline-blue-400' onChange={(e) => {setMobileNo(e.target.value)}} />

      <button 
        onClick={createUser}
        className = 'bg-gray-200 p-1 rounded drop-shadow-md hover:bg-blue-300'
      > Create User 
      </button>

    </div>
  )
}

export default Register