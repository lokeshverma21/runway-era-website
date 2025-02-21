import React from 'react'
import { useSelector } from 'react-redux'
import Title from './Title.jsx'

function CartTotal() {
    const cartAmount = useSelector((state)=> state.cart.totalPrice);
    const {currency} = useSelector((state)=> state.currency)
    // console.log(cartAmount.totalPrice)
    // console.log(cartAmount)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'cart'} text2={'totals'}/>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {cartAmount}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency} 10.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {cartAmount ? cartAmount + 10 : 0}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal