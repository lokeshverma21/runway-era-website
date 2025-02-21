import { clearCart } from '@/features/cart/cartSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Verify() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {

        try {
            if (!token) {
                return null
            }
    
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders/verifyStripe`,{success,orderId},{
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
    
            if (response.data.success === true) {
                dispatch(clearCart())
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message)
        }
    }


    useEffect(() => {
        verifyPayment()
    },[token])

  return (
    <div>Verify</div>
  )
}

export default Verify