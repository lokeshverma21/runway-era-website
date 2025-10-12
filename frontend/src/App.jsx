import {Outlet} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer'
import SearchBar from "./components/SearchBar.jsx"
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./features/collections/collectionSlice.js";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when app starts
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer position="bottom-right"/>
      <ScrollToTop/>
      <Navbar/>
      <SearchBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
