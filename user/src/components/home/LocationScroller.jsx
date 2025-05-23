import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Enhanced location data with more details
const locationsData = [
  {
    id: 'guwahati',
    name: 'GUWAHATI',
    subtitle: 'Gateway to Northeast',
    properties: '45+ Properties',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    path: '/properties?location=guwahati'
  },
  {
    id: 'kaziranga',
    name: 'KAZIRANGA',
    subtitle: 'Wildlife Paradise',
    properties: '25+ Properties',
    image: 'https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    path: '/properties?location=kaziranga'
  },
  {
    id: 'meghalaya',
    name: 'MEGHALAYA',
    subtitle: 'Abode of Clouds',
    properties: '35+ Properties',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    path: '/properties?location=meghalaya'
  },
  {
    id: 'arunachal',
    name: 'ARUNACHAL PRADESH',
    subtitle: 'Land of Rising Sun',
    properties: '20+ Properties',
    image: 'https://images.unsplash.com/photo-1544461772-722f499fa5a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    path: '/properties?location=arunachal-pradesh'
  },
  {
    id: 'nagaland',
    name: 'NAGALAND',
    subtitle: 'Land of Festivals',
    properties: '18+ Properties',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    path: '/properties?location=nagaland'
  },
  {
    id: 'manipur',
    name: 'MANIPUR',
    subtitle: 'Jewel of India',
    properties: '15+ Properties',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    path: '/properties?location=manipur'
  },
  {
    id: 'mizoram',
    name: 'MIZORAM',
    subtitle: 'Land of Blue Mountains',
    properties: '12+ Properties',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    path: '/properties?location=mizoram'
  }
];

const LocationScroller = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320; // Width of one card plus gap
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Explore Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the untouched beauty and rich culture of Northeast India through our carefully curated destinations
          </p>
        </div>
        
        {/* Scrollable container with navigation */}
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Horizontal scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide px-12 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {locationsData.map((location, index) => (
              <Link 
                key={location.id} 
                to={location.path}
                className="flex-shrink-0 group cursor-pointer transform transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl w-80 h-96 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
                  {/* Background image */}
                  <img 
                    src={location.image} 
                    alt={location.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {/* Location icon */}
                    <div className="flex items-center mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <MapPinIcon className="h-4 w-4 mr-1 text-indigo-300" />
                      <span className="text-sm text-indigo-200">{location.properties}</span>
                    </div>
                    
                    {/* Location name */}
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-indigo-200 transition-colors duration-300">
                      {location.name}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-gray-300 text-sm mb-3 opacity-90">
                      {location.subtitle}
                    </p>
                    
                    {/* Animated underline */}
                    <div className="w-12 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded transition-all duration-500 group-hover:w-24 group-hover:from-indigo-300 group-hover:to-purple-300"></div>
                    
                    {/* Call to action */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-sm font-medium text-indigo-200 flex items-center">
                        Explore accommodations
                        <ChevronRightIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover border effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-400/50 rounded-2xl transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* View all destinations button */}
        <div className="text-center mt-12">
          <Link 
            to="/properties" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 space-x-2"
          >
            <span>View All Destinations</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationScroller;