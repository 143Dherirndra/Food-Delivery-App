


import React, { useState } from 'react';
import axios from 'axios';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const ForgatePassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [err,setError]=useState('');

  // 🔹 Send OTP
  const handleSendOtp = async () => {
    try {
      const result = await axios.post(`http://localhost:4000/api/auth/sendotp`, { email }, {
        withCredentials: true
      });
      console.log(result);
      setError("")
      setStep(2);
    } catch (error) {
      setError(error?.response?.data?.message);

    }
  };

  // 🔹 Verify OTP
  const handleVerify = async () => {
    try {
      const result = await axios.post(`http://localhost:4000/api/auth/verifyotp`, { email, otp }, {
        withCredentials: true
      });
      console.log(result);
      setError("")
      setStep(3);
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  };

  // 🔹 Reset Password
  const handleReset = async () => {
    if (newpassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const result = await axios.post(`http://localhost:4000/api/auth/resetotp`, { email, newpassword }, {
        withCredentials: true
      });
      console.log(result);
      setError("")
      navigate('/signIn');
    } catch (error) {
     setError(error?.response?.data?.message)
    }
  };

  return (
    <div className='flex justify-center bg-[#fff9f6] min-h-screen w-full items-center p-4'>
      <div className='shadow-lg rounded-xl bg-white max-w-md p-8'>
        <div className='flex items-center gap-4 mb-3'>
          <IoIosArrowRoundBack
            size={30}
            className='text-[#ff4d2d] cursor-pointer'
            onClick={() => navigate('/signup')}
          />
          <h1 className='text-2xl font-semibold text-[#ff4d2d]'>Forgot Password</h1>
        </div>

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <div>
            <label htmlFor="email" className='block text-gray-700 mb-2'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              className='border focus:outline-none focus:border-orange-500 w-full px-3 py-2 rounded-lg'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              className='w-full bg-[#ff4d2d] font-semibold mt-4 rounded-lg text-white py-2 cursor-pointer'
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          {err &&  <p className='text-red-500 my-[10x]'>{err}</p>}
          </div>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <div>
            <label htmlFor="otp" className='block text-gray-700 mb-2'>OTP</label>
            <input
              type='text'
              id='otp'
              placeholder='Enter OTP'
              className='border focus:outline-none focus:border-orange-500 w-full px-3 py-2 rounded-lg'
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
            <button
              className='w-full bg-[#ff4d2d] font-semibold mt-4 rounded-lg text-white py-2 cursor-pointer'
              onClick={handleVerify}
            >
              Verify OTP
            </button>
          {err &&  <p className='text-red-500 my-[10x]'>{err}</p>}
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div>
            <label htmlFor="newPassword" className='block text-gray-700 mb-2'>New Password</label>
            <input
              type='password'
              id='newPassword'
              placeholder='Enter new password'
              className='border focus:outline-none focus:border-orange-500 w-full px-3 py-2 rounded-lg'
              onChange={(e) => setNewpassword(e.target.value)}
              value={newpassword}
            />
            <label htmlFor="confirmPassword" className='block text-gray-700 mt-3 mb-2'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='Confirm new password'
              className='border focus:outline-none focus:border-orange-500 w-full px-3 py-2 rounded-lg'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <button
              className='w-full bg-[#ff4d2d] font-semibold mt-4 rounded-lg text-white py-2 cursor-pointer'
              onClick={handleReset}
            >
              Reset Password
            </button>
         {err &&  <p className='text-red-500 my-[10x]'>{err}</p>} 
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgatePassword;
