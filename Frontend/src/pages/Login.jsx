import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
const BACKEND_URL = "https://backend-project-1-wxg2.onrender.com";
const Login = () => {
  let navigate=useNavigate();
  let {localStorages}= useAuth();
  let[User,setUser]=useState({
    email:"",
    password:""
  })
  let update=(e)=>{
    console.log(e)
let name=e.target.name;
let value=e.target.value;
setUser({
  ...User,
  [name]:value
})

  }
  let Submit= async (e)=>{
e.preventDefault();
console.log("USer is",User);
try{
  const Deep={...User};
  const response=await fetch(`${BACKEND_URL}/user/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"

    },
    body: JSON.stringify(Deep)
  })
  if(response.ok){
    alert(`Login succesfully`)
  let data=await response.json();
  console.log("our data is",data);
localStorages(data.tokens);
  navigate("/");
  }
  else{
    alert(`Wrong input`)
  }

} catch(err){
  console.log(err)
}




setUser({
  email:"",
    password:""
})
  }

 let [showButton,setShowButton]=useState(true);
  return (
   
   <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl w-full max-w-[90%] sm:max-w-[400px] md:max-w-[450px] p-6 sm:p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500">
        {/* Logo or Icon (optional) */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-3xl">🔐</span>
        </div>

        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-extrabold text-center text-2xl sm:text-3xl md:text-4xl mb-8">
          Welcome Back
        </h1>
        
        <form onSubmit={Submit} className="space-y-6">
          <div className="space-y-5">
            {/* Email Input */}
            <div className="group">
              <input 
                type="email"
                value={User.email} 
                name='email' 
                onChange={update} 
                placeholder='Email' 
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white text-sm sm:text-base placeholder-gray-400"
              />
            </div>
            
            {/* Password Input */}
            <div className="group relative">
              <input 
                type={showButton ? "text" : "password"} 
                value={User.password} 
                name='password' 
                onChange={update} 
                placeholder='Password' 
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white text-sm sm:text-base placeholder-gray-400 pr-12"
              />
              <button 
                type="button" 
                onClick={() => setShowButton(!showButton)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl hover:scale-110 transition-transform duration-200 text-gray-400 hover:text-gray-300"
              >
                {showButton ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-gray-400 text-sm sm:text-base">
              New User?
            </span>
            <Link 
              to="/register" 
              className="text-blue-400 hover:text-blue-300 text-sm sm:text-base font-medium transition-colors duration-300"
            >
              Create Account
            </Link>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type='submit' 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base shadow-lg"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
       
      </div>
    </div>
  )

}
export default Login
