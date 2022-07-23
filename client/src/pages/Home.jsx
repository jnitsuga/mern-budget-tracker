import React from 'react'
import HomeSummary from '../components/HomeSummary'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar header='/home' subHeader='Home' />
      <HomeSummary />
    </>
  )
}

export default Home