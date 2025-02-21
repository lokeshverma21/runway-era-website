import { setToken } from '@/features/auth/authSlice';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [userToken, setUserToken] = useState();

  const userToken = useSelector((state) => state.auth.token)

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      let response;

      if (currentState === 'Sign Up') {
        response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {name,email,password})

      }else{
        response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`,{email,password})
        // console.log(response.data.data)
      }

        dispatch(setToken(response.data.data));
        toast.success(response.data.message);
        navigate('/')

    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    }
  }


  useEffect(() => {
    if (userToken) {
      navigate('/')
    }
  },[userToken, navigate])

  return (
      <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
          <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
          </div>

          {currentState === 'Login' ? '' : <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>

          <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer'>Forgot your password?</p>
            {
              currentState === 'Login'
              ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
              : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
            }
          </div>

          <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
  )
}

export default Login