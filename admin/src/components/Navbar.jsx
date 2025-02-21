import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/paths'

function Navbar({setToken}) {
  return (
    <div className='flex justify-between items-center px-10 py-4'>
        <img src={assets.logo} alt="" className='w-30'/>
        {/* <Link to='/' className='font-bold text-2xl'>LOGO.</Link> */}
        <button onClick={() => setToken('')} className='border border-gray-700 hover:bg-black hover:text-white px-6 py-2 cursor-pointer transition'>Logout</button>
    </div>
  )
}

export default Navbar