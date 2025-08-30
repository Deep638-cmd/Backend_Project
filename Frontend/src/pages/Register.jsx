import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "https://backend-project-2-lya3.onrender.com";
const Register = () => {
  let navigate=useNavigate();
  const [Save,setSave]=useState({

    name: "",
    email:"",
    number:"",
    password: "",
    Cpassword:""   
  })
   const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleInput=(e)=>{
console.log(e);
let name=e.target.name;
let value=e.target.value;
setSave({
  ...Save,
  [name]:value
})

  }
const handleSubmit = async (e) => {
  e.preventDefault();

  if (Save.password !== Save.Cpassword) {
    alert("Password is not matched");
    return;
  }

  try {
    // 👉 Use a copy of Save before resetting
    const userData = { ...Save };

    const response = await fetch(`${BACKEND_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log("✅ Server response:", data);

    // 👉 Reset only after successful call
    setSave({
      name: "",
      email: "",
      number: "",
      password: "",
      Cpassword: ""
    });
    navigate("/login")
  } catch (err) {
    console.log("❌ Fetch error:", err);
  }
};


  return (
     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-2xl w-full max-w-[90%] sm:max-w-[450px] md:max-w-[500px] p-4 sm:p-6 md:p-8 border border-gray-700">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-extrabold text-center text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-4">
            {/* Name Input */}
            <div className="group">
              <input 
                name="name"
                onChange={handleInput}
                type='text' 
                placeholder='Name'
                autoComplete='off'
                value={Save.name}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            {/* Email Input */}
            <div className="group">
              <input 
                name="email"
                onChange={handleInput}
                type='email'
                placeholder='Email'
                autoComplete='off'
                value={Save.email}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            {/* Phone Number Input */}
            <div className="group">
              <input 
                type='number'
                onChange={handleInput}
                name="number"
                placeholder='Phone Number'
                autoComplete='off'
                value={Save.number}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            {/* Password Input */}
            <div className="group relative">
              <input 
                value={Save.password}
                name="password"
                onChange={handleInput}
                autoComplete='off'
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 transition-all duration-300 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform duration-200"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="group relative">
              <input 
                value={Save.Cpassword}
                onChange={handleInput}
                name="Cpassword"
                autoComplete='off'
                placeholder='Confirm Password'
                type={showConfirm ? "text" : "password"}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 transition-all duration-300 text-sm sm:text-base"
              />
              <button
                type='button'
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform duration-200"
              >
                {showConfirm ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 sm:pt-4">
            <button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
              type='submit'
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Already have account link */}
        <div className="mt-6 text-center text-sm sm:text-base">
          <span className="text-gray-400">Already have an account?</span>
          <button 
            onClick={() => navigate('/login')}
            className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>

    
  )
}

export default Register
