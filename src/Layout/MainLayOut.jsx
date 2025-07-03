import React from 'react'
import Topbar from '../Components/Shared/Topbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../Components/Shared/Footer'
import Navbar from '../Components/Shared/Navbar'
import PathTracker from '../Components/Shared/PathTracker'
import CopyRight from '../Components/Shared/CopyRight'

const MainLayOut = () => {

  return (
    <div className='bg-[#div]'>
      <Topbar />
      <Navbar />
      <PathTracker />
      <Outlet />
      <Footer />
      <CopyRight />
    </div>
  )
}

export default MainLayOut
