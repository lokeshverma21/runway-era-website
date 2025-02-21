import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token'); // Remove token if empty
    }
  }, [token]);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <ToastContainer position='bottom-right' />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Outlet context={{ token }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
