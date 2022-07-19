import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../contexts/ContextProvider'

const Banner = (props) => {
  const { userLoggedIn, logoutUser } = useUserContext();

  return (
    <div className='m-4'>
      <div className={`${props.bannerTw} bg-gray rounded-xl w-full p-8 pt-9 bg-jc-lilypad-01 bg-no-repeat bg-cover bg-center`}>
        <div className='flex justify-between items-center'>
          <div>
            <p className={`${props.headerTw} font-bold text-gray-700`}>{props.header}</p>
            <p className={`${props.subHeaderTw} text-3xl`}>{props.subHeader}</p>
          </div>
        </div>
        <div className='mt-6'>
          {/* <button 
            color='white'
            bgColor='blue'
            text='Download'
            borderRadius='10px'
            size='md'>Download
          </button>  */}
        </div>
      </div>

      <div className='flex w-full items-center p-4 bg-slate-200 drop-shadow-sm rounded-xl mt-3 h-14'>
        <div className='nav-links flex'>
          <Link to='/' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center'>
            <span></span>
            <span className='ml-1 hover:text-lg'>Home</span>
          </Link>

          {userLoggedIn ?
            <>
            <Link to='/lists' style={{ display: 'flex' }} className='m-2 text-sm cursor-pointer items-center'>
              <span></span>
              <span className='ml-1 hover:text-lg'>My List</span>
            </Link> 

            <span className='flex ml-1 hover:text-lg m-2 text-sm cursor-pointer items-center' onClick={logoutUser}>Log Out</span>
            </>
          : 
            <>
            </>
          }

        </div>
      
      </div>

    </div>
  )
}

export default Banner