import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black/95 backdrop-blur-sm text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Deep Das
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <NavLinks isAuthenticated={isAuthenticated} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLinks isAuthenticated={isAuthenticated} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </nav>
  );
};

// NavLinks component for both desktop and mobile
const NavLinks = ({ isAuthenticated }) => {
  const navLinkStyles = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-blue-400 bg-gray-900"
        : "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
    }`;

  return (
    <>
      <NavLink to="/" className={navLinkStyles}>Home</NavLink>
      <NavLink to="/service" className={navLinkStyles}>Service</NavLink>
      <NavLink to="/about" className={navLinkStyles}>About</NavLink>
      <NavLink to="/contact" className={navLinkStyles}>Contact</NavLink>
      {isAuthenticated ? (
        <NavLink to="/logout" className={navLinkStyles}>Logout</NavLink>
      ) : (
        <>
          <NavLink to="/register" className={navLinkStyles}>Register</NavLink>
          <NavLink to="/login" className={navLinkStyles}>Login</NavLink>
        </>
      )}
    </>
  );
};

// Mobile NavLinks component
const MobileNavLinks = ({ isAuthenticated, setIsMenuOpen }) => {
  const mobileNavLinkStyles = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
      isActive
        ? "text-blue-400 bg-gray-900"
        : "text-gray-300 hover:text-blue-400 hover:bg-gray-700"
    }`;

  const handleClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <NavLink to="/" className={mobileNavLinkStyles} onClick={handleClick}>Home</NavLink>
      <NavLink to="/service" className={mobileNavLinkStyles} onClick={handleClick}>Service</NavLink>
      <NavLink to="/about" className={mobileNavLinkStyles} onClick={handleClick}>About</NavLink>
      <NavLink to="/contact" className={mobileNavLinkStyles} onClick={handleClick}>Contact</NavLink>
      {isAuthenticated ? (
        <NavLink to="/logout" className={mobileNavLinkStyles} onClick={handleClick}>Logout</NavLink>
      ) : (
        <>
          <NavLink to="/register" className={mobileNavLinkStyles} onClick={handleClick}>Register</NavLink>
          <NavLink to="/login" className={mobileNavLinkStyles} onClick={handleClick}>Login</NavLink>
        </>
      )}
    </>
  );
};

export default Navbar;