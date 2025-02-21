import { assets } from '@/assets'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          {/* <img src="" alt="" /> */}
          {/* <h1 className='font-bold text-2xl'>RunwayEra.</h1> */}
          <img src={assets.logowhite} alt="Runawayera" className='md:w-36 items-center w-full'/>
          <p className='text-base text-gray-600 w-full md:w-2/3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, assumenda. Adipisci accusantium unde nihil pariatur! Molestias ut repudiandae delectus fugiat.</p>
        </div>

        <div>
            <p className='uppercase font-medium text-xl mb-5'>company</p>
            <ul className='flex flex-col text-gray-600 gap-1'>
              <Link to={'/'}>Home</Link>
              <Link to={'/about'}>About us</Link>
              <Link to={'/collection'}>Collections</Link>
              <Link to={'/privacy-policy'}>Privacy policy</Link>
              <Link to={'/terms'}>Terms & Conditions</Link>
            </ul>
        </div>

        <div>
            <p className='uppercase font-medium text-xl mb-5'>Get i touch</p>
            <ul className='flex flex-col text-gray-600 gap-1'>
              <li>+91 - 00000-00000</li>
              <li>lokesh21980@gmail.com</li>
            </ul>
        </div>
      </div>

      <div>
        <hr/>
        <p className='py-5 text-center text-sm'>
          Copyright 2025@ lokeshverma.in - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer