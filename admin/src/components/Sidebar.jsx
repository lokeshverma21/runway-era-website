import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/paths'
import { CirclePlus, LayoutDashboard, ListOrdered, Shirt } from 'lucide-react'

function Sidebar() {
  return (
    <div className='w-[18%] min-h-screen border-r-1'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

            <NavLink to='/' className='flex items-center gap-3 border border-gray-300 px-3 py-2 mr-2'>
                {/* <img src={assets.addIcon} alt="Add item" className='w-h h-5' /> */}
                <LayoutDashboard />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 px-3 py-2 mr-2'>
                {/* <img src={assets.addIcon} alt="Add item" className='w-h h-5' /> */}
                <CirclePlus />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 px-3 py-2 mr-2'>
                {/* <img src={assets.orderIcon} alt="Add item" className='w-h h-5' /> */}
                <Shirt />
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 px-3 py-2 mr-2'>
                {/* <img src={assets.itemIcon} alt="Add item" className='w-h h-5' /> */}
                <ListOrdered  />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar