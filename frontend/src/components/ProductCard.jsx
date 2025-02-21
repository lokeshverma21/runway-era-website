import { assets } from '@/assets'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function ProductCard({id,productImage, productName, price}) {
    const currency = useSelector((state)=>state.currency.currency)
  return (
    <Link to={`/product/${id}`} className='bg-slate-50 text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img src={productImage} alt="" className='hover:scale-110 transition ease-in-out'/>
        </div>
        <p className='pt-3 pb-1 px-1 text-sm'>{productName}</p>
        <p className='text-sm font-medium px-1'>{currency}{price}</p>
    </Link>
  )
}

export default ProductCard