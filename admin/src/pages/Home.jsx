import React from 'react'
import { assets } from '../assets/paths'

function Home() {
  return (
    <div className='flex items-center justify-center'>
      <img src={assets.welcomeimg} alt="" className='w-[50vw] h-[80vh]' />
    </div>
  )
}

export default Home