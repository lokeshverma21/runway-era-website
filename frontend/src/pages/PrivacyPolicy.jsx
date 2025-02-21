import React from 'react'

function PrivacyPolicy() {
  return (
    <div className='border-t'>
        <h1 className='text-center font-bold text-3xl my-2'>Privacy Policy</h1>
        <p className='my-2 text-center md:text-start'>Effective Date: 21 Feb 2025</p>
        <h2 className='text-center my-10'>
            <span className='font-medium'>RunwayEra</span> ("we," "our," "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
        </h2>

        <h3 className='font-semibold mb-2'>1. Information We Collect</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>Personal Information: When you create an account or place an order, we may collect your name, email, shipping address, and phone number.</li>
            <li className='ml-4'>Payment Information: While payments can be processed, no real transactions are required. Payment details (if entered) are managed by third-party providers (e.g., Stripe, Razorpay) and not stored on our servers.</li>
            <li className='ml-4'>Cookies & Analytics: We may use cookies to enhance your browsing experience and track website performance.</li>
        </ul>

        <h3 className='font-semibold mb-2'>
            2. How We Use Your Information
        </h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>To provide and manage your account.</li>
            <li className='ml-4'>To process orders (even if payments are not required).</li>
            <li className='ml-4'>To improve our website and customer experience.</li>
            <li className='ml-4'>To send updates, promotions, or relevant offers (optional).</li>
        </ul>


        <h3 className='font-semibold mb-2'>3. Data Security</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>We implement industry-standard security measures to protect your personal data. However, we cannot guarantee absolute security.</li>
        </ul>

        <h3 className='font-semibold mb-2'>4. Third-Party Services</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>
            We may use third-party services (e.g., payment gateways, analytics tools). These services have their own privacy policies, and we encourage you to review them.
            </li>
        </ul>

        <h3 className='font-semibold mb-2'>5. Your Rights</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>You have the right to request access, correction, or deletion of your data. Contact us at lokesh21980@gmail.com for any privacy-related concerns.</li>
        </ul>

        <h3 className='font-semibold mb-2'>6. Updates to This Policy</h3>
        <ul className='mb-10 list-inside list-disc space-y-1'>
            <li className='ml-4'>We may update this Privacy Policy periodically. Any changes will be posted here with an updated effective date.</li>
        </ul>
    </div>
  )
}

export default PrivacyPolicy