import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Title from './Title';
import ProductCard from './ProductCard';

function RelatedProduct({category, subCategory}) {
    const { products, loading, error } = useSelector((state) => state.products || { products: [] });

    const [related, setRelated] = useState([])

    useEffect(()=>{
        if (products.length > 0 ) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)

            // console.log(productsCopy.slice(0,5))
            setRelated(productsCopy.slice(0,5))
        }
    },[products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'Related'} text2={'products'}/>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {
                related.map((item,index) => (
                    <ProductCard key={index} id={item._id} productName={item.name} price={item.price} productImage={item.image[0]}/>
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProduct