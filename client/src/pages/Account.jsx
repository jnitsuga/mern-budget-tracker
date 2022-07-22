import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Navbar from '../components/Navbar'

const Account = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const payload = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }

    Axios.get('http://localhost:4000/api/users/me', payload).then((response) => {
      setUser(response.data)
    })
  }, [setUser])

  return (
    <>
    <Navbar header='/account' headerTw='text-gray-700' subHeader='Account' subHeaderTw='text-black' bannerTw='h-32 bg-jc-lilypad-02'/>
    <div>
      <div className='usersDisplay flex flex-wrap justify-center gap-2'>
        <div className='bg-amber-100 text-center m-4 p-4 text-md drop-shadow-md rounded'>
          <p>First Name: {user.firstName} </p>
          <p>Last Name:  {user.lastName} </p>
          <p>Username: {user.username} </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Account