import { Link } from 'react-router-dom';
import photo from "./photo/home-page.png"
import photo1 from "./photo/images.png"
import { useAuth } from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  let navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight">
              Welcome to Deep Das Profile
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Are you ready to work together? Let's create something amazing! Connect with me and let's bring your ideas to life.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/contact">
                <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                  Connect Now
                </button>
              </Link>
              {
                !isAuthenticated && 
              <Link to="/register">
                <button className="w-full sm:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                  Register Now
                </button>
              </Link>
}
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src={photo} 
              alt="Deep Das" 
              className="w-full max-w-[500px] mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500" 
            />
          </div>
        </div>
      </div>

      {/* Secondary Image Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <img 
            src={photo1} 
            alt="Technology Stack" 
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300" 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;