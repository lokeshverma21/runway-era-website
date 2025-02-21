import Title from '@/components/Title'
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Orders() {
  // const {products} = useSelector((state) => state.products);
  const {currency} = useSelector((state) => state.currency);
  const token = useSelector((state) => state.auth.token);
  const { products, loading, error } = useSelector((state) => state.products || { products: [] });

  const [orderData, setOrderData] = useState([])

  const fetchOrderData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/userorder`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response.data.data)

      setOrderData((response.data.data).reverse())
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchOrderData()
  },[]);

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
          <Title text1={'my'} text2={'orders'}/>
      </div>

      <div>
          {
            orderData.map((order)=>(
              order.items.map((item,index) => {
                const product = products.find((p) => p._id === item.productId)

                return(
                  <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                        <img src={product?.image[0]} alt="" className='w-16 sm:w-20'/>
                        <div>
                          <p className='sm:text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                              <p className='text-lg'>{currency}{product?.price}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Size: {item.size}</p>
                          </div>
                          <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(order.createdAt).toDateString()}</span></p>
                          <p className='mt-2'>Payment: <span className='text-gray-400'>{order.paymentMethod}</span></p>
                        </div>
                    </div>

                    <div className='md:w-1/2 flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>{order.status}</p>
                        </div>

                        <button onClick={fetchOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
                    </div>
                </div>
                )
              })
              
            ))
          }
      </div>
      
    </div>
  )
}

export default Orders