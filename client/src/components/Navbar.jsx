import React from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useUserContext } from '../contexts/ContextProvider'

const Navbar = () => {
  const { loggedIn } = useUserContext()

  return (
    <div className='flex w-full items-center justify-between p-4 bg-slate-200 drop-shadow-sm h-12'>
      <div className='title'>
        <Link to='/'>
          <span className='m-2 text-xl font-bold'>VaccTrack</span>
        </Link>
      </div>

      <div className='nav-links flex'>
        {loggedIn ? 
          <p className='flex items-center'>
            <span>Hello, {loggedIn}</span>
          </p> 
          : 
          <>
            <Link to='/login' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center'>
              <span><FaSignInAlt /></span>
              <span className='ml-1'>Log In</span>
            </Link>

            <Link to='/register' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center'>
              <span><FaUser /></span>
              <span className='ml-1'>Register</span>
            </Link> 
          </>
          }
      </div>
      
    </div>
  )
}

export default Navbar