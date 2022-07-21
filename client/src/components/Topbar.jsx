import React from 'react'
import Dropdown from '../components/Dropdown'
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useUserContext } from '../contexts/ContextProvider'

const Topbar = () => {
  const { userLoggedIn } = useUserContext();

  return (
    <div className='flex w-full items-center justify-between p-4 bg-zinc-900 drop-shadow-sm h-12'>
      <div className='title'>
        <Link to='/'>
          <span className='m-2 text-xl font-bold text-gray-100'>Fint</span>
        </Link>
      </div>

      <div className='nav-links flex'>
        {userLoggedIn ? 
          <>
          <Dropdown />
          {/* <Link to='/me' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center'>
            <span><FaUser /></span>
            <span className='ml-1'>Account</span>
          </Link> */}
          </>
          : 
          <>
            <Link to='/login' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center text-gray-200'>
              <span><FaSignInAlt /></span>
              <span className='ml-1'>Log In</span>
            </Link>

            <Link to='/register' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center text-gray-200'>
              <span><FaUser /></span>
              <span className='ml-1'>Register</span>
            </Link> 
          </>
          }
      </div>
      
    </div>
  )
}

export default Topbar