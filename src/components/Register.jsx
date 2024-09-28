import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const auth = getAuth(app);

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+1",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Weak"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      evaluatePasswordStrength(e.target.value); // Evaluate password as user types
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to evaluate password strength
  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1; // Minimum length
    if (/[A-Z]/.test(password)) score += 1; // Uppercase letter
    if (/[a-z]/.test(password)) score += 1; // Lowercase letter
    if (/\d/.test(password)) score += 1; // Digit
    if (/[@$!%*?&#]/.test(password)) score += 1; // Special character

    let label = "Weak";
    if (score >= 4) {
      label = "Strong";
    } else if (score >= 3) {
      label = "Medium";
    }

    setPasswordStrength({ score, label });
  };

  const createUser = () => {
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        alert("Success");
        console.log("User Info:", formData);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "rgb(160, 198, 247)" }}>
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Create an Account</h1>

        <div className="space-y-6">
          {/* First Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              onChange={handleChange}
              value={formData.firstName}
              name="firstName"
              type="text"
              required
              placeholder="John"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              onChange={handleChange}
              value={formData.lastName}
              name="lastName"
              type="text"
              required
              placeholder="Doe"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              onChange={handleChange}
              value={formData.email}
              name="email"
              type="email"
              required
              placeholder="john.doe@example.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                onChange={handleChange}
                value={formData.phoneNumber}
                name="phoneNumber"
                type="tel"
                required
                placeholder="123 456 7890"
                className="w-full p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              onChange={handleChange}
              value={formData.password}
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="********"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Password Strength Meter */}
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-300 rounded h-2">
              <div
                className={`h-2 rounded transition-all duration-300 ${passwordStrength.score >= 4 ? "bg-green-500" : passwordStrength.score >= 3 ? "bg-yellow-500" : "bg-red-500"}`}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-600">{passwordStrength.label}</span>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              onChange={handleChange}
              value={formData.confirmPassword}
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              placeholder="********"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            onClick={createUser}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
