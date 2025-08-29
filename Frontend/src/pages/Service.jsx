import React from 'react';
import image from "./photo/image.png";
import { useAuth } from '../store/Auth';

const Service = () => {
  const { service } = useAuth();
  console.log("Service data:", service);

  // Show loading state if service is undefined
  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Loading services...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      {/* Header Section */}
      <div className="py-6 sm:py-8 md:py-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent px-4">
          Our Services
        </h1>
      </div>
      
      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {Array.isArray(service) && service.map((currentElement, index) => {
            const { title, description, price } = currentElement;
            return (
              <div 
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
              >
                {/* Service Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img 
                    src={image} 
                    alt={title || "Service"} 
                    className="w-full h-48 sm:h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Service Content */}
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    {title}
                  </h2>
                  
                  <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
                    {description}
                  </p>

                  {/* Price Tag */}
                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-semibold text-blue-400">
                      ₹{price}
                    </span>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 text-sm sm:text-base">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;