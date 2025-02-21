import React from 'react'

function Terms() {
  return (
    <div className='border-t'>
        <h1 className='text-center font-bold text-3xl my-2'>Terms & Conditions</h1>
        <p className='my-2 text-center md:text-start'>Effective Date: 21 Feb 2025</p>

        <p>By accessing RunwayEra ("Website"), you agree to these Terms & Conditions. If you do not agree, please do not use this site.</p>

        <h3 className='font-semibold mb-2'>1. Use of the Website</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>This website is for personal, non-commercial use.</li>
            <li className='ml-4'>You must be at least 13 years old to use this site.</li>
            <li className='ml-4'>We reserve the right to modify or discontinue any part of the website without notice.</li>
        </ul>

        <h3 className='font-semibold mb-2'>2. Orders & Payments</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>While you can place orders, payments are optional since this is a personal learning project.</li>
            <li className='ml-4'>We do not guarantee product availability or shipping as this project is for educational purposes.</li>
        </ul>

        <h3 className='font-semibold mb-2'>3. Intellectual Property</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>All content, including logos, images, and text, is owned by RunwayEra and may not be used without permission.</li>
        </ul>

        <h3 className='font-semibold mb-2'>4. Limitation of Liability</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>We are not responsible for any errors, interruptions, or security breaches.</li>
            <li className='ml-4'>We do not provide warranties regarding the accuracy of information on the website.</li>
        </ul>

        <h3 className='font-semibold mb-2'>5. Disclaimer</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>This website is a hobby or personal project by the developer and is not intended for actual use.</li>
        </ul>

        <h3 className='font-semibold mb-2'>6. Image Ownership Disclaimer</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>All images featured on this website belong to their respective owners. If you believe an image is being used improperly, please contact us for resolution.</li>
            <li>Images used from :
                <a href="https://unsplash.com/" className='text-blue-500 ml-10' target='_blank'>Unsplash</a>
                <a href="https://www.pexels.com/" className='text-blue-500 ml-10' target='_blank'>Pexels</a>
            </li>
        </ul>

        <h3 className='font-semibold mb-2'>7. Changes to Terms</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>We may update these Terms & Conditions from time to time. Continued use of the website signifies acceptance of the updated terms.</li>
        </ul>

        <p>For any questions, contact us at lokesh21980@gmail.com.</p>
    </div>
  )
}

export default Terms