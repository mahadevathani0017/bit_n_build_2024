import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';
import { FaSpinner } from 'react-icons/fa';

const auth = getAuth(app);

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
 
  const [loading, setLoading] = useState(true);
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
        const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const signUser = () => {
    if (isSubmitting) return; 
    setIsSubmitting(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Sign In Success");
        alert("Sign In Successful!");
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Sign In Error: ${err.message}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const registerUser = () => {
    if (isSubmitting) return; 
    setIsSubmitting(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Registration Success");
        alert("Registration Successful!");
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Registration Error: ${err.message}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

 
  const ShimmerPlaceholder = () => (
    <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg animate-pulse'>
      <div className='h-6 bg-gray-300 rounded mb-4'></div>
      <div className='h-4 bg-gray-300 rounded mb-2'></div>
      <div className='h-4 bg-gray-300 rounded mb-4'></div>
      <div className='h-10 bg-gray-300 rounded mb-2'></div>
      <div className='h-10 bg-gray-300 rounded mb-2'></div>
      <div className='h-10 bg-gray-300 rounded'></div>
    </div>
  );

  if (loading) {
    return (
      <div className='signin-page bg-[rgb(160,198,247)] min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold mb-4 animate-pulse'>Sign In Page</h1>
        <ShimmerPlaceholder />
      </div>
    );
  }

  return (
    <div className='signin-page bg-[rgb(160,198,247)] min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Sign In Page</h1>

      
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        
        <label className='block mb-2 text-lg'>Enter Your Email</label>
        <input 
          className='w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500' 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          type="email" 
          placeholder="Enter your Email here" 
          disabled={isSubmitting}
        />

       
        <label className='block mb-2 text-lg'>Enter Your Password</label>
        <input 
          className='w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500' 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          type="password" 
          placeholder="Enter your password here" 
          disabled={isSubmitting}
        />

       
        <button 
          className={`w-full bg-blue-500 text-white py-2 rounded mb-2 flex items-center justify-center ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`} 
          onClick={signUser}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

    
        <button 
          className={`w-full bg-green-500 text-white py-2 rounded flex items-center justify-center ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`} 
          onClick={registerUser}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </div>
  );
}

export default SignIn;
