import React from 'react'

const Banner = (props) => {
  return (
    <div className='m-4'>
      <div className={`${props.bannerTw} h-44 bg-gray rounded-xl w-full p-8 pt-9 bg-jc-lilypad-01 bg-no-repeat bg-cover bg-center`}>
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
    </div>
  )
}

export default Banner