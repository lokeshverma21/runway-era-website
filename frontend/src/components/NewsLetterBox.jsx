import React from 'react'

function NewsLetterBox() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, necessitatibus.</p>

        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 border border-gray-400 mx-auto pl-3 my-6'>
            <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your email' required />
            <button type='submit' className='uppercase bg-black text-white text-xs px-10 py-4 cursor-pointer'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox