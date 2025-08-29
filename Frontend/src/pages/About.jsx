import aboutImg from "./photo/home-page.png";
import { Link } from 'react-router-dom';
import { useAuth } from "../store/Auth"

const About = () => {
  const { user } = useAuth();
  const Name = user?.name || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4 sm:px-6 md:px-8 py-10 md:py-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-5 md:space-y-6 max-w-xl">
          {/* Welcome Message */}
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg md:text-xl text-blue-400 font-medium">
              Welcome, {Name}
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Why Choose Us?
            </h1>
          </div>

          {/* Features List */}
          <div className="space-y-4 sm:space-y-5">
            {[
              { title: 'Expertise', content: 'Our team consists of experienced IT professionals who are passionate about staying up-to-date with the latest industry trends.' },
              { title: 'Customization', content: 'We understand that every business is unique. That\'s why we create solutions that are tailored to your specific needs and goals.' },
              { title: 'Customer-Centric Approach', content: 'We prioritize your satisfaction and provide top-notch support to address your IT concerns.' },
              { title: 'Affordability', content: 'We offer competitive pricing without compromising on the quality of our services.' },
              { title: 'Reliability', content: 'Count on us to be there when you need us. We\'re committed to ensuring your IT environment is reliable and available 24/7.' }
            ].map((item, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300 bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <p className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-blue-400">{item.title}:</span>{' '}
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-6">
            
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                Connect Now
              </button>
            </Link>
            <button className="w-full sm:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img 
            src={aboutImg} 
            alt="About us" 
            className="w-[280px] sm:w-[350px] md:w-[450px] h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500 hover:rotate-2"
          />
        </div>
      </div>
    </div>
  );
};

export default About;