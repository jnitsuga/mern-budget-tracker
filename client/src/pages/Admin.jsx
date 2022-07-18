import React from 'react'
import { useUserContext } from '../contexts/ContextProvider';
import Banner from '../components/Banner';

const Admin = () => {
  const { listOfUsers } = useUserContext();

  return (
    <>
    <Banner header='/admin' headerTw='text-gray-400' subHeader='Admin' subHeaderTw='text-white' bannerTw='h-32 bg-jc-ridethewave-02'/>
    <div>
      <div className='usersDisplay flex flex-wrap justify-center gap-2'>
        {listOfUsers.map((user, key) => {
          return (
            <div key={key} className='bg-amber-100 text-center m-4 p-4 text-md drop-shadow-md'>
              <p>First Name: {user.firstName} </p>
              <p>Last Name: {user.lastName} </p>
              <p>Username: {user.username} </p>
              {/* <p>Password: {user.password} </p> */}
              {user.email !== '' ? <p>Email: {user.email} </p> : null }
              {user.mobileNo !== '' ? <p>Mobile No: {user.mobileNo} </p> : null }
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default Admin