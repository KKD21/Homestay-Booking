import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFilter, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getProperties } from '../services/propertyService';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card relative">
      {property.isNew && (
        <span className="property-card-badge">New</span>
      )}
      <div className="relative">
        <img 
          src={property.thumbnail || 'https://via.placeholder.com/300x200'} 
          alt={property.name} 
          className="property-card-image"
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:text-primary-500 transition-colors">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate">{property.name}</h3>
        <p className="property-card-location mb-2">
          <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-gray-500" />
          {property.city}, {property.state}
        </p>
        <div className="flex justify-between items-center">
          <p className="property-card-price">₹{property.rooms && property.rooms[0] ? property.rooms[0].price : '0'}<span className="text-sm font-normal text-gray-500">/night</span></p>
          <Link to={`/properties/${property.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const PropertyTypeFilter = ({ activeFilter, setActiveFilter }) => {
  const propertyTypes = [
    { id: 'all', label: 'All' },
    { id: 'campsite', label: 'Campsite' },
    { id: 'cruise', label: 'Cruise' },
    { id: 'guesthouse', label: 'Guesthouse' },
    { id: 'homestay', label: 'Homestay' },
    { id: 'hotel', label: 'Hotel' },
    { id: 'penthouse', label: 'Penthouse' },
    { id: 'resort', label: 'Resort' },
    { id: 'villa', label: 'Villa' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {propertyTypes.map((type) => (
        <button
          key={type.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === type.id
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveFilter(type.id)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

const PropertyListing = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'all';
  
  const [activeFilter, setActiveFilter] = useState(initialType);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });

  // Filter properties based on type and search term
  const filteredProperties = properties
    .filter(property => {
      // Filter by property type
      if (activeFilter !== 'all') {
        return property.property_type.toLowerCase() === activeFilter;
      }
      return true;
    })
    .filter(property => {
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          property.name.toLowerCase().includes(searchLower) ||
          property.city.toLowerCase().includes(searchLower) ||
          (property.state && property.state.toLowerCase().includes(searchLower))
        );
      }
      return true;
    });

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Stay</h1>
            <p className="text-gray-600">Discover amazing properties across Northeast India</p>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location or property name"
                className="search-input pr-10 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon 
                icon={faFilter} 
                className="absolute right-3 top-3 text-gray-400" 
              />
            </div>
          </div>
        </div>
        
        <PropertyTypeFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        {isLoading ? (
          <div className="text-center py-12">Loading properties...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">Error loading properties. Please try again later.</div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12">No properties found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;