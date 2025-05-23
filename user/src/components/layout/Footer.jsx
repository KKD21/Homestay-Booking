import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const locations = [
    { name: 'ARUNACHAL PRADESH', path: '/locations/arunachal-pradesh' },
    { name: 'DIBRUGARH', path: '/locations/dibrugarh' },
    { name: 'GUWAHATI', path: '/locations/guwahati' },
    { name: 'JORHAT', path: '/locations/jorhat' },
    { name: 'KAZIRANGA', path: '/locations/kaziranga' },
    { name: 'MEGHALAYA', path: '/locations/meghalaya' },
    { name: 'NAGALAND', path: '/locations/nagaland' },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and Address */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-2xl font-bold text-white">StayMoksha</span>
            </Link>
            <p className="text-sm mb-2">
              Staymoksha Headquarter,<br />
              House Number NA 26, West Jyotinagar,<br />
              Bamunimaidan, Guwahati, Assam 781004
            </p>
            {/* Social Media Icons - Placeholder */}
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i> {/* Placeholder for Facebook Icon */}</a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i> {/* Placeholder for Instagram Icon */}</a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i> {/* Placeholder for Twitter Icon */}</a>
            </div>
          </div>

          {/* Column 2: Quick Links & Legal */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-indigo-400">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Explore Locations</h5>
            <ul className="space-y-2">
              {locations.map(loc => (
                <li key={loc.name}><Link to={loc.path} className="hover:text-indigo-400">{loc.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Form */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Contact Us</h5>
            <p className="text-sm mb-3">Share your name and number so our team can connect with you.</p>
            <form>
              <div className="mb-3">
                <input type="text" placeholder="Full Name" className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="mb-3">
                <input type="text" placeholder="Phone Number" className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">&copy; {currentYear} StayMoksha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;