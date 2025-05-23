import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkin: '',
    checkout: '',
    guests: '2'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search data:', searchData);
    // Implement search functionality here
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" 
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        {/* Hero Text */}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Discover Your Perfect
            <span className="block text-indigo-300">Homestay Experience</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed">
            Immerse yourself in the authentic culture and warm hospitality of Northeast India. 
            Find unique homestays that offer more than just accommodation.
          </p>
        </div>

        {/* Enhanced Search Form */}
        <div className="max-w-5xl mx-auto animate-fade-in-up delay-300">
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
            <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-end">
              {/* Location */}
              <div className="lg:col-span-2">
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1 text-indigo-600" />
                  Where to?
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={searchData.location}
                    onChange={handleInputChange}
                    placeholder="Search destinations..." 
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-lg transition-all duration-300 hover:border-indigo-300"
                  />
                </div>
              </div>

              {/* Check in */}
              <div>
                <label htmlFor="checkin" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <CalendarDaysIcon className="h-4 w-4 mr-1 text-indigo-600" />
                  Check in
                </label>
                <input 
                  type="date" 
                  id="checkin" 
                  name="checkin"
                  value={searchData.checkin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-lg transition-all duration-300 hover:border-indigo-300"
                />
              </div>

              {/* Check out */}
              <div>
                <label htmlFor="checkout" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <CalendarDaysIcon className="h-4 w-4 mr-1 text-indigo-600" />
                  Check out
                </label>
                <input 
                  type="date" 
                  id="checkout" 
                  name="checkout"
                  value={searchData.checkout}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-lg transition-all duration-300 hover:border-indigo-300"
                />
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-1 text-indigo-600" />
                  Guests
                </label>
                <select 
                  id="guests" 
                  name="guests"
                  value={searchData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-lg transition-all duration-300 hover:border-indigo-300"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6+ Guests</option>
                </select>
              </div>

              {/* Search Button */}
              <div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up delay-500">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-300 mb-2">500+</div>
            <div className="text-gray-300">Verified Homestays</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-300 mb-2">50K+</div>
            <div className="text-gray-300">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-300 mb-2">4.8★</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;