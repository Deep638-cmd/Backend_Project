import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';

const BACKEND_URL = "https://backend-project-3-5usz.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const { localStorages } = useAuth();
  
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!user.email || !user.password) {
        toast.error('Please fill in all fields');
        return;
      }

      const response = await fetch(`${BACKEND_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(user)
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorages(data.tokens);
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl w-full max-w-md p-6 border border-gray-700/50">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={update}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={update}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
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

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              New User?
            </span>
            <Link 
              to="/register"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              Create Account
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                     text-white font-medium py-2 rounded-lg transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;