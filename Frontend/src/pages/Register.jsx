import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BACKEND_URL = "https://backend-project-3-5usz.onrender.com";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [Save, setSave] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    Cpassword: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSave(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!Save.name || !Save.email || !Save.number || !Save.password || !Save.Cpassword) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (Save.password !== Save.Cpassword) {
        setError("Passwords don't match");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: Save.name,
          email: Save.email,
          number: Save.number,
          password: Save.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSave({
          name: "",
          email: "",
          number: "",
          password: "",
          Cpassword: ""
        });
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl w-full max-w-md p-6 border border-gray-700/50">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={Save.name}
              onChange={handleInput}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={Save.email}
              onChange={handleInput}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="number"
              value={Save.number}
              onChange={handleInput}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={Save.password}
              onChange={handleInput}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Create password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type={showCPassword ? "text" : "password"}
              name="Cpassword"
              value={Save.Cpassword}
              onChange={handleInput}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={() => setShowCPassword(!showCPassword)}
              className="absolute right-3 top-8 text-gray-400"
            >
              {showCPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Already have an account?
            </span>
            <Link 
              to="/login"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              Login here
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 
                     hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all 
                     duration-300 transform hover:scale-[1.02] active:scale-[0.98] 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;