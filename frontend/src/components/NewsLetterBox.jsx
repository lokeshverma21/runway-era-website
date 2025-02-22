import React from 'react'
import { toast } from 'react-toastify';

function NewsLetterBox() {

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("You are subscribed!!")
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3 w-3/4 m-auto'>Join our exclusive list and enjoy 20% off your first purchase! Stay updated with the latest trends, special deals, and new arrivals—straight to your inbox.</p>

        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 border border-gray-400 mx-auto pl-3 my-6'>
            <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your email' required />
            <button type='submit' className='uppercase bg-black text-white text-xs px-10 py-4 cursor-pointer'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox