import contact from "./photo/Contact.png";
import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = "https://backend-project-oc4e.onrender.com";
//import {User} from "./Login";
const Contact = () => {
  const[Users,setUsers]=useState({
    name: "",
    email:"",
    massege:""
  })
  const {user}=useAuth();
  // const[datas,setdatas]=useState(true);
  useEffect(() => {
    if (user ) {
      setUsers(prevState => ({
        ...prevState,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);
  //setdatas(false)
let changes = (e) => {
  let name = e.target.name;
  let value = e.target.value;
 
  setUsers({
    ...Users,
    [name]: value
  });
};




const handleSubmits = async (e) => {
  e.preventDefault();


  try {
    // 👉 Use a copy of Save before resetting
    const userData = { ...Users };

    const response = await fetch(`${BACKEND_URL}/other/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("Token")}` // Add this line
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log("✅ Server response:", data);

    // 👉 Reset only after successful call
    setUsers({
      name: "",
      email: "",
      massege:""
      
    });
    //navigate("/login")
  } catch (err) {
    console.log("❌ Fetch error:", err);
  }
};
 const {isAuthenticated}=useAuth();
 const navigate=useNavigate();
 useEffect(()=>{
if(!isAuthenticated){
  alert(`Please Login at First`)
  return navigate("/login");
}
 },[isAuthenticated,navigate])
  return (
     <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      {/* Header */}
      <div className="container mx-auto text-center mb-8 sm:mb-12">
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>
          Contact Us
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img 
            src={contact} 
            alt='Contact illustration' 
            className="w-full max-w-[500px] mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500" 
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2">
          <form 
            onSubmit={handleSubmits}
            className="bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-xl border border-gray-700/50"
          >
            <div className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-300">
                  Your Name
                </label>
                <input 
                  type="text" 
                  name="name"  
                  onChange={changes} 
                  value={Users.name} 
                  autoComplete='off'
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-300">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email" 
                  onChange={changes} 
                  value={Users.email}
                  autoComplete='off'
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-gray-300">
                  Your Message
                </label>
                <textarea 
                  name="massege" 
                  onChange={changes} 
                  value={Users.massege}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type='submit'
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
