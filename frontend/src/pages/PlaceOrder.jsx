import { assets } from '@/assets'
import CartTotal from '@/components/CartTotal'
import Title from '@/components/Title'
import { clearCart } from '@/features/cart/cartSlice';
import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PlaceOrder() {

const dispatch = useDispatch();
const [method, setMethod] = useState('cod');
const { cartItems, totalQuantity, totalPrice, loading } = useSelector((state) => state.cart);
const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
});

const token = useSelector((state) => state.auth.token);
// console.log(token)


const navigate = useNavigate();


const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data, [name]:value}))
}

// console.log(cartItems)

const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!cartItems.length) {
        toast.error("Your cart is empty!")
        return;
    }

    const orderData = {
        // userId: "USER_ID_FROM_STORE",
        items: cartItems.map(item => ({
            productId: item.productId,
            size: item.size || "M",
            quantity: item.quantity
        })),
        amount: totalPrice + 10, 
        address: { ...formData }, 
        paymentMethod: method
    };

    // let apiUrl = ""

    if (method === "cod") {

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders/place-order`, JSON.stringify(orderData),{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
    
            console.log(response.data)
    
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(clearCart())
                navigate('/orders')
            }else{
                toast.error(error.response.data.message || "Something went wrong!")
            }
        } catch (error) {
            console.log(error.message)
            toast.error("Failed to place order please try again!")
        }

    } else if (method === "stripe") {
        try {
            const responseStripe = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/orders/place-order-stripe`,
                JSON.stringify(orderData),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            console.log(responseStripe.data);
    
            if (responseStripe.data.success) {
                const { session_url } = responseStripe.data.data; // Fixing data extraction
                window.location.replace(session_url);
            } else {
                toast.error(responseStripe.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to place order, please try again!");
        }    

    }else if (method === "razorpay") {
        // apiUrl = "/orders/place-order-razorpay";
        toast.warning("Razorpay payments are disabled for now!")
    }


}

return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-3xl sm:text-2xl my-3'>
              <Title text1={'Delivery'} text2={'information'}/>
          </div>
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
              <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address'/>
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
              <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
          </div>
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip code'/>
              <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>
      </div>



      <div className='mt-8'>
          <div className='mt-8 min-w-80'>
              <CartTotal/>
          </div>

          <div className='mt-12'>
              <Title text1={'Payment'} text2={'method'}/>


              <div className='flex gap-3 flex-col lg:flex-row'>
                  <div onClick={()=> setMethod('stripe')} className='flex items-center border gap-3 p-2 px-3 cursor-pointer'>
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                      <img src={assets.stripeLogo} className='h-5 mx-4' alt="" />
                  </div>
                  <div onClick={()=> setMethod('razorpay')} className='flex items-center border gap-3 p-2 px-3 cursor-pointer'>
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                      <img src={assets.razorpayLogo} className='h-5 mx-4' alt="" />
                  </div>
                  <div onClick={()=> setMethod('cod')} className='flex items-center border gap-3 p-2 px-3 cursor-pointer'>
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                      {/* <img src={assets.stripeLogo} className='h-5 mx-4' alt="" /> */}
                      <p className='uppercase text-sm text-gray-700'>cash on delivery</p>
                  </div>
              </div>

              <div className='w-full text-end mt-8'>
                  <button type='submit' className='uppercase bg-black text-white px-16 py-3 text-sm cursor-pointer'>place order</button>
              </div>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder