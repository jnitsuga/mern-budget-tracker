import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Navbar from '../components/Navbar';
import { useUserContext } from '../contexts/ContextProvider';

const Admin = () => {
  const { listOfUsers, setListOfUsers } = useUserContext();
  const [ user, setUser ] = useState({})

  useEffect(() => {
    const payload = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }

    Axios.get('http://localhost:4000/api/users/me', payload).then((response) => {
      setUser(response.data)
      if(response.data.isAdmin === true) {
        Axios.get('http://localhost:4000/api/users/getUsers').then((response) => {
          setListOfUsers(response.data)
        })
      } else {
        window.setTimeout(function() {
          window.location='/'
        }, 3000)
      }
    })


    
  }, [setListOfUsers])

  return (
    <>
    {user.isAdmin ? <>
    <Navbar header='/admin' headerTw='text-gray-400' subHeader='Admin' subHeaderTw='text-white' bannerTw='h-32 bg-jc-ridethewave-02'/>
    <div>
      <div className='usersDisplay flex flex-wrap justify-center gap-2'>
         
        
        {listOfUsers.map((userFromList, key) => {
          return (
            <div key={key} className='bg-amber-100 text-center m-4 p-4 text-md drop-shadow-md'>
              <p>First Name: {userFromList.firstName} </p>
              <p>Last Name: {userFromList.lastName} </p>
              <p>Username: {userFromList.username} </p>
              {/* <p>Password: {user.password} </p> */}
              {userFromList.email !== '' ? <p>Email: {userFromList.email} </p> : null }
              {userFromList.mobileNo !== '' ? <p>Mobile No: {userFromList.mobileNo} </p> : null }
            </div>
          )
        })}
      </div>
    </div>
    </> 
    :
    <>
    <Navbar header='/404' headerTw='text-gray-400' subHeader='Unauthorized Access' subHeaderTw='text-white' bannerTw='h-32 bg-jc-ridethewave-02'/>
    
    </>
    } 
    </>
  )
}

export default Admin