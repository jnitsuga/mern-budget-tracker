import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex relative justify-between p-4 bg-slate-200'>
      <div className='title'>
        <Link to='/'>
          <span className='m-2 text-xl'>Vaccine Tracker</span>
        </Link>
      </div>

      <div className='nav-links'>
        <Link to='/register'>
          <span className='m-2 text-sm'>Register</span>
        </Link>

        <Link to='/login'>
          <span className='m-2 text-sm'>Log In</span>
        </Link>
      </div>

    </div>
  )
}

export default Navbar