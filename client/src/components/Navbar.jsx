import React from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex relative items-center justify-between p-4 bg-slate-200 drop-shadow-sm'>
      <div className='title'>
        <Link to='/'>
          <span className='m-2 text-xl font-bold'>Vaccine Tracker</span>
        </Link>
      </div>

      <div className='nav-links flex'>
        <Link to='/login' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center'>
          <span><FaSignInAlt /></span>
          <span className='ml-1'>Log In</span>
        </Link>

        <Link to='/register' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center'>
          <span><FaUser /></span>
          <span className='ml-1'>Register</span>
        </Link>

      </div>

    </div>
  )
}

export default Navbar