import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg backdrop-blur-md' : 'bg-white/10 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 transition-colors duration-300 ${
              isScrolled ? 'text-indigo-600' : 'text-white'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className={`ml-3 text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}>StayMoksha</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `font-medium transition-colors duration-300 hover:scale-105 ${
                isScrolled 
                  ? (isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600') 
                  : (isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white')
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/properties" 
            className={({ isActive }) => 
              `font-medium transition-colors duration-300 hover:scale-105 ${
                isScrolled 
                  ? (isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600') 
                  : (isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white')
              }`
            }
          >
            Properties
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `font-medium transition-colors duration-300 hover:scale-105 ${
                isScrolled 
                  ? (isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600') 
                  : (isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white')
              }`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `font-medium transition-colors duration-300 hover:scale-105 ${
                isScrolled 
                  ? (isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600') 
                  : (isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white')
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Login Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isScrolled 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30'
            }`}
          >
            Login
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="px-4 py-6 space-y-4">
            <NavLink 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block font-medium transition-colors ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/properties" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block font-medium transition-colors ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600'
                }`
              }
            >
              Properties
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block font-medium transition-colors ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600'
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block font-medium transition-colors ${
                  isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;