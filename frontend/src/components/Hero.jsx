import React from 'react'
import { assets } from '../assets'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* left */}
        <div className='flex items-center justify-center py-10 sm:py-0 w-full sm:w-1/2'>
            <div>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-gray-600'></p>
                    <h3 className='font-medium text-sm md:text-base uppercase'>our bestsellers</h3>
                </div>

                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest arrivals</h1>

                <div className='flex items-center gap-2'>
                    <Link to={'/collection'} className='font-medium text-sm md:text-base uppercase'>shop now</Link>
                    <p className='w-8 md:w-11 h-[2px] bg-gray-800'></p>
                </div>
            </div>
        </div>

        <div className='w-full sm:w-1/2'>
            <img src={assets.hero1} alt="" />
        </div>
    </div>
  )
}

export default Hero