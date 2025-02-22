import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearch } from '@/features/collections/searchSlice';
import { clearToken } from '@/features/auth/authSlice';
import { toast } from 'react-toastify';
import { clearCart } from '@/features/cart/cartSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state) => state.cart);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleSearchClick = () => {
    navigate('/collection');
    dispatch(toggleSearch());
  };

  const handleLogoutClick = () => {
    dispatch(clearToken());
    dispatch(clearCart());
    navigate('/login');
    toast.info('User logged out successfully');
  };

  // Toggle dropdown on click for small screens
  const toggleDropdown = () => {
    if (!token) {
      navigate('/login');
    } else {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center justify-between py-4 font-medium'>
      <Link to={'/'}>
        {/* <h1>LOGO.</h1> */}
        <img src={assets.logo4} alt="Ranway Era" className='w-30'/>
      </Link>

      <div className="hidden md:flex gap-5 text-sm">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1`}>
          {({ isActive }) => (
            <>
              <p>HOME</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </>
          )}
        </NavLink>
        <NavLink to="/collection" className={({ isActive }) => `flex flex-col items-center gap-1`}>
          {({ isActive }) => (
            <>
              <p>COLLECTION</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </>
          )}
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center gap-1`}>
          {({ isActive }) => (
            <>
              <p>ABOUT</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </>
          )}
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `flex flex-col items-center gap-1`}>
          {({ isActive }) => (
            <>
              <p>CONTACT</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </>
          )}
        </NavLink>
      </div>

      <div className='flex gap-5'>
        <div className='cursor-pointer'>
          <img src={assets.search} alt="" className='w-6 h-6' onClick={handleSearchClick} />
        </div>

        <div className='group relative dropdown-container'>
          <img onClick={toggleDropdown} src={assets.profile} alt="" className='w-6 h-6 cursor-pointer' />

          {token && (
            <div className={`absolute right-0 pt-4 ${isDropdownOpen ? "block" : "hidden"} group-hover:block dropdown-menu`}>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-slate-500 rounded'>
                <p className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='hover:text-black cursor-pointer'>Orders</p>
                <p onClick={handleLogoutClick} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart} alt="" className='w-6 h-6' />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{totalQuantity}</p>
        </Link>

        <img onClick={() => setIsNavOpen(true)} src={assets.menu} className='w-7 cursor-pointer sm:hidden' alt="" />
      </div>

      {/* Side menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${isNavOpen ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setIsNavOpen(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='rotate-180 w-4' src={assets.arrow} alt="" />
            <p className='text-gray-500'>Back</p>
          </div>
          <NavLink onClick={() => setIsNavOpen(false)} to='/' className={({ isActive }) => `py-2 pl-6 border uppercase ${isActive ? 'bg-black text-white' : ''}`}>HOME</NavLink>
          <NavLink onClick={() => setIsNavOpen(false)} to='/collection' className={({ isActive }) => `py-2 pl-6 border uppercase ${isActive ? 'bg-black text-white' : ''}`}>Collection</NavLink>
          <NavLink onClick={() => setIsNavOpen(false)} to='/about' className={({ isActive }) => `py-2 pl-6 border uppercase ${isActive ? 'bg-black text-white' : ''}`}>About</NavLink>
          <NavLink onClick={() => setIsNavOpen(false)} to='/contact' className={({ isActive }) => `py-2 pl-6 border uppercase ${isActive ? 'bg-black text-white' : ''}`}>Contact</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
