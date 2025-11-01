import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  productImage,
  productName,
  price,
}) => {
  const currency = useSelector((state) => state.currency?.currency ?? "$");

  return (
    <Link
      to={id ? `/product/${id}` : "#"}
      className="group block rounded border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gray-50 h-56">
        {productImage ? (
          <img
            src={productImage}
            alt={productName}
            className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-white">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="mb-1 text-sm font-medium leading-snug text-gray-900">{productName}</p>
        <p className="text-base font-semibold text-gray-900">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;




// import { assets } from '@/assets'
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

// function ProductCard({id,productImage, productName, price}) {
//     const currency = useSelector((state)=>state.currency.currency)
//   return (
//     <Link to={`/product/${id}`} className='bg-slate-50 text-gray-700 cursor-pointer'>
//         <div className='overflow-hidden'>
//             <img src={productImage} alt="" className='hover:scale-110 transition ease-in-out'/>
//         </div>
//         <p className='pt-3 pb-1 px-1 text-sm'>{productName}</p>
//         <p className='text-sm font-medium px-1'>{currency}{price}</p>
//     </Link>
//   )
// }

// export default ProductCard
