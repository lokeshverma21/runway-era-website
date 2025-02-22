import { assets } from '@/assets'
import NewsLetterBox from '@/components/NewsLetterBox'
import Title from '@/components/Title'
import React from 'react'

function Contact() {
  return (
    <div>
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'contact'} text2={'us'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.pimg} alt="" className='w-full md:max-w-[450px]'/>

        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>Gurugram <br />Delhi 350, Delhi, India</p>
            <p className='text-gray-500'>Tel: (000) 000-0000 <br />Email: lokesh21980@gmail.com</p>
            <p className='font-semibold text-xl text-gray-600'>Careers at Runway Era</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>
            <a href='https://lokeshverma.in' target='_blank' className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white cursor-pointer transition ease-in'>Contact Developer</a>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default Contact