import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter your name.');
      return; 
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return; 
    }

    if (!email) {
      setError('Please enter your email.');
      return; 
    }

    if (!password) {
      setError('Please enter your password.');
      return; 
    }

    setError('');

    // SignUp API calls 
    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
      });

      // handle successful account creation reponse 
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      // handle account creation error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occured. Please try again.')
      }
    }
  }
  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-3'>
              Sign Up  
            </h4>

            {/* name input */}
            <input 
              type='text' 
              placeholder='Name' 
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* email input */}
            <input 
              type='text' 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* password input */}
            <PasswordInput 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            {/* create account button */}
            <button type='submit' className='btn-primary'>
              Create Account 
            </button>

            {/* login text link */}
            <p className='text-sm text-center mt-4'>
              Already have an account? {" "}
              <Link to='/login' className='font-medium text-blue-500 underline'>
                Login 
              </Link>
            </p>

          </form>
        </div> 
      </div> 
    </>
  )
}

export default SignUp