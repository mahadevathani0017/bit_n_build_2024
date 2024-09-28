import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';

const auth = getAuth(app);

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => console.log("Sign In Success"))
      .catch((err) => console.log(err.message));
  };

  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => console.log("Registration Success"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className='signin-page bg-[rgb(160,198,247)] min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Sign In Page</h1>

      {/* Email/Password Sign In */}
      <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-lg'>
        <label className='block mb-2 text-lg'>Enter Your email</label>
        <input 
          className='w-full p-2 border border-gray-300 rounded mb-4' 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          type="email" 
          placeholder="Enter your Email here" 
        />
        <label className='block mb-2 text-lg'>Enter Your password</label>
        <input 
          className='w-full p-2 border border-gray-300 rounded mb-4' 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          type="password" 
          placeholder="Enter your password here" 
        />
        <button 
          className='w-full bg-blue-500 text-white py-2 rounded mb-2' 
          onClick={signUser}>Sign In</button>
        <button 
          className='w-full bg-green-500 text-white py-2 rounded' 
          onClick={registerUser}>Register</button>
      </div>
    </div>
  );
}

export default SignIn;
