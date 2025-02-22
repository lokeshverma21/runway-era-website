import { assets } from '@/assets'
import NewsLetterBox from '@/components/NewsLetterBox'
import Title from '@/components/Title'
import React from 'react'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'about'} text2={'us'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.pimg2} alt="" className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At Runway Era, fashion isn’t just about clothing—it’s a statement, an attitude, and a way of life. Born from a passion for style and innovation, we set out to redefine how people shop for fashion online. Our goal is simple: to bring you the latest trends, timeless essentials, and effortless shopping, all in one place.</p>
          <p>We meticulously curate a diverse collection of high-quality apparel, ensuring every piece reflects elegance, comfort, and individuality. From everyday wear to statement outfits, Runway Era connects you with styles that inspire confidence and self-expression.</p>
          <p className='text-gray-800 font-bold'>Our Mission</p>
          <p>At Runway Era, we believe in fashion without limits. Our mission is to offer a seamless, enjoyable shopping experience that brings convenience, quality, and trend-forward designs right to your doorstep. Step into the world of Runway Era—where style meets simplicity.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={'Choose us'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-400 px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>

        <div className='border border-gray-400 px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>

        <div className='border border-gray-400 px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default About