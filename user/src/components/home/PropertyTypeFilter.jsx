import React, { useState } from 'react';

const propertyTypes = [
  'All',
  'Campsite',
  'Cruise',
  'Guesthouse',
  'Homestay',
  'Hotel',
  'Penthouse',
  'Resort',
  'Villa',
];

const PropertyTypeFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterClick = (type) => {
    setActiveFilter(type);
    if (onFilterChange) {
      onFilterChange(type);
    }
  };

  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">Brand new properties</h2>
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 sm:space-x-3 md:space-x-4">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleFilterClick(type)}
              className={`px-4 py-2 mb-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out 
                          ${activeFilter === type 
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyTypeFilter;