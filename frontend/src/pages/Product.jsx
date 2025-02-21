import { assets } from '@/assets';
import RelatedProduct from '@/components/RelatedProduct';
import { addToCartAsync } from '@/features/cart/cartSlice';
// import { addItemToCart } from '@/features/cart/cartSlice.js';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

function Product() {

  const dispatch = useDispatch();
  const {productId} = useParams();
  // console.log(productId)

  const [product, setProduct] = useState(false)
  const [mainImage, setMainImage] = useState('');
  const [productSize, setProductSize] = useState('')

  const currency = useSelector((state) => state.currency.currency)

  // const { products, loading, error } = useSelector((state) => state.products || { products: [] });
  // const { userId } = useSelector((state) => state.auth.token); // Get logged-in user ID from Redux
  const { products, loading, error } = useSelector((state) => state.products || { products: [] });

  const fetchProducctData = async() => {
    // console.log('first')
    // console.log(products)
    products.map((item)=>{
      // console.log(item._id)
      if (item._id == productId) {
        setProduct(item)
        setMainImage(item.image[0])
        // console.log("item:",item)
        return null
      }
      // console.log("item:",item)
    })
  }

  useEffect(()=>{
    // console.log(products)
    fetchProducctData();
  },[]);


  const handleAddTocart = () => {
    if (!productSize) {
        toast.error('Please select product size')
        return
    }

    dispatch(addToCartAsync({ 
      itemId: product._id,
      size: productSize,
    })).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
          toast.success("Item added to cart!");
      } else {
          toast.error(response.payload);
      }
    });

    // toast.success('Item added to cart')
  }

  return product ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/* images */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                {
                    product.image.map((item,index) => (
                      <img src={item} onClick={() => setMainImage(item)} alt="" key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
                    ))
                }
            </div>

            <div className='w-full sm:w-[80%]'>
                <img src={mainImage} alt="" className='w-full h-auto'/>
            </div>
          </div>

          {/* product details */}
          <div className='flex-1'>
                <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
                <div className='flex items-center gap-1 mt-2'>
                  <img src={assets.star} alt="" className='w-3' />
                  <img src={assets.star} alt="" className='w-3' />
                  <img src={assets.star} alt="" className='w-3' />
                  <img src={assets.star} alt="" className='w-3' />
                  <img src={assets.starDull} alt="" className='w-3' />
                  <p className='pl-2'>(121)</p>
                </div>
                <p className='mt-5 text-3xl font-medium'>{currency}{product.price}</p>
                <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>

                <div className='flex flex-col gap-4 my-8'>
                  <p>Select size</p>
                  <div className='flex gap-2'>
                      {
                        product.sizes.map((size, index) => (
                          <button onClick={() => setProductSize(size)} key={index} className={`cursor-pointer py-2 px-4 bg-gray-100 ${size === productSize ? 'border border-orange-500' : ''}`}>{size}</button>
                        ))
                      }
                  </div>
                </div>

                <button className='uppercase bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer' onClick={handleAddTocart}>ADD TO CART</button>
                
                <hr className='mt-8 sm:w-4/5'/>
                <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                      <p>100% Original product.</p>
                      <p>Cash on delivery is available on this product.</p>
                      <p>Easy return and exchange policy within 7 days.</p>
                </div>
          </div>
      </div>

        {/* description */}
        <div className='mt-20'>
          <div className='flex'>
              <p className='border px-5 py-3 text-sm'>Description</p>
              <p className='border px-5 py-3 text-sm'>Reviews</p>
          </div>    
          <div className='flex flex-col border px-6 py-6 gap-4 text-sm text-gray-500'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officiis minima nobis modi, obcaecati repellendus. Tempora ex iusto dolor a. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione provident facere laudantium nemo possimus sit nisi placeat dicta sequi assumenda?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, ex. Reprehenderit eius quam, ex explicabo necessitatibus cumque magni fugiat cum veniam, molestiae in dicta iure dolorum impedit, dolorem voluptatem nemo.</p>
          </div>         
        </div>


        {/* related products */}

        <RelatedProduct category={product.category} subCategory={product.subCategory}/>
    </div>
  ) : (
    <div className='opacity-0'></div>
  )
}

export default Product