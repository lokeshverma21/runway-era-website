import { assets } from '@/assets'
import { setSearchQuery, toggleSearch } from '@/features/collections/searchSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function SearchBar() {

    const dispatch = useDispatch()
    const {showSearch,searchQuery} = useSelector((state)=> state.search)
    const [visible, setVisible] = useState(false)

    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true)
        }else{
            setVisible(false)
        }
    },[location]);

    const handleCross = () => {
        dispatch(toggleSearch())
    };


    const handleSearch = (value) => {
        dispatch(setSearchQuery(value))
    }
    
    // useEffect(() => {
    //     console.log("Search query updated:", searchQuery);
    //   }, [searchQuery]);

    
    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input type="text" onChange={(e) => handleSearch(e.target.value)} placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
                <img src={assets.search} alt="" className='w-4'/>
            </div>
            <img src={assets.cross} onClick={handleCross} alt="" className='inline w-3 cursor-pointer'/>
        </div>
  ) : null
}

export default SearchBar




// const debounce = (func, delay) => {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => func(...args), delay);
//     };
//   };
  
//   const handleSearchDebounced = debounce((value) => {
//     dispatch(setSearchQuery(value));
//   }, 300);
  

// <input
//   type="text"
//   onChange={(e) => handleSearchDebounced(e.target.value)}
//   placeholder="Search"
//   className="flex-1 outline-none bg-inherit text-sm"
// />