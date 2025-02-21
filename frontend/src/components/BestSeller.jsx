import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Title from './Title'
import ProductCard from './ProductCard';    

function BestSeller() {
    const { products, loading, error } = useSelector((state) => state.products || { products: [] });
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        if (Array.isArray(products)) {
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSeller(bestProduct.slice(0, 5));
        }
    }, [products]); // Re-run effect when `products` change
    


  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'best'} text2={'sellers'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, inventore.
        </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {bestSeller.map((item, index)=>(
                <ProductCard key={index} id={item.id} productImage={item.image[0]} productName={item.name} price={item.price}/>
            ))}
        </div>
    </div>
  )
}

export default BestSeller