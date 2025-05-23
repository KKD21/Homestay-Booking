import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCalendarDays, faUsers, faHeart, faChevronDown, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getProperties } from '../services/propertyService';
import brandConfig from '../config/brandConfig';

// Search form component for the hero section
const SearchForm = () => {
  return (
    <div className="search-form text-gray-800 flex flex-col md:flex-row items-center">
      <div className="flex-1 relative border-r border-gray-200 px-4 py-2">
        <label className="block text-xs text-gray-500 font-medium mb-1">Where</label>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faLocationDot} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Select a city" 
            className="w-full border-none focus:ring-0 text-sm font-medium p-0" 
          />
        </div>
      </div>
      <div className="flex-1 relative border-r border-gray-200 px-4 py-2">
        <label className="block text-xs text-gray-500 font-medium mb-1">Check in</label>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Add Date" 
            className="w-full border-none focus:ring-0 text-sm font-medium p-0" 
          />
        </div>
      </div>
      <div className="flex-1 relative border-r border-gray-200 px-4 py-2">
        <label className="block text-xs text-gray-500 font-medium mb-1">Check out</label>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Add Date" 
            className="w-full border-none focus:ring-0 text-sm font-medium p-0" 
          />
        </div>
      </div>
      <div className="flex-1 relative px-4 py-2">
        <label className="block text-xs text-gray-500 font-medium mb-1">Add guests</label>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faUsers} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="1 Adults, 0 Children" 
            className="w-full border-none focus:ring-0 text-sm font-medium p-0" 
          />
        </div>
      </div>
      <button className="search-button ml-4 h-12 w-12 flex items-center justify-center rounded-full">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

// Location selection component with carousel-like design
const LocationSelection = () => {
  const locations = [
    { id: 'guwahati', name: 'GUWAHATI', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' },
    { id: 'kaziranga', name: 'KAZIRANGA', image: 'https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' },
    { id: 'meghalaya', name: 'MEGHALAYA', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' },
    { id: 'arunachal', name: 'ARUNACHAL PRADESH', image: 'https://images.unsplash.com/photo-1544461772-722f499fa5a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-3 text-center">Select a Location</h2>
        <p className="text-gray-600 text-center mb-10">Explore our handpicked destinations in Northeast India</p>
        
        <div className="relative">
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 hidden md:block">
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors">
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location) => (
              <div key={location.id} className="location-card group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl h-72 shadow-lg">
                  <img 
                    src={location.image} 
                    alt={location.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{location.name}</h3>
                    <div className="mt-2 w-10 h-1 bg-primary-500 rounded transition-all duration-300 group-hover:w-20"></div>
                    <p className="mt-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore accommodations</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 hidden md:block">
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors">
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Property card component with enhanced styling
const PropertyCard = ({ property }) => {
  return (
    <div className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white relative hover:-translate-y-2">
      {property.isNew && (
        <span className="absolute top-4 right-4 z-20 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">New</span>
      )}
      <div className="relative overflow-hidden">
        <img 
          src={property.thumbnail || 'https://via.placeholder.com/300x200'} 
          alt={property.name} 
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:text-primary-500 transition-colors z-10">
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 truncate group-hover:text-primary-600 transition-colors">{property.name}</h3>
        <p className="text-gray-500 text-sm mb-3 flex items-center">
          <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-gray-500" />
          {property.city}, {property.state}
        </p>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <p className="font-bold text-lg text-primary-600">₹{property.rooms && property.rooms[0] ? property.rooms[0].price : '0'}<span className="text-xs font-normal text-gray-500 ml-1">/night</span></p>
          <Link to={`/properties/${property.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

// Property type filter component
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
    <div className="inline-flex flex-wrap justify-center gap-3 bg-gray-100 p-2 rounded-full">
      {propertyTypes.map((type) => (
        <button
          key={type.id}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === type.id 
              ? 'bg-white text-primary-600 shadow-md' 
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveFilter(type.id)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });

  const filteredProperties = activeFilter === 'all'
    ? properties
    : properties.filter(property => property.property_type.toLowerCase() === activeFilter);

  return (
    <div>
      {/* Hero Section - Full-width with high-quality background */}
      <section className="hero-section relative h-screen min-h-[600px] bg-cover bg-center flex items-center justify-center" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="mb-6">
            <img src="https://www.staymoksha.com/static/media/logo-white.e9c7f2a0.svg" alt="Stay Moksha" className="h-16 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">Secure Your Dream Vacation</h1>
          <h2 className="text-2xl md:text-3xl font-light mb-10 text-white">With a Reservation</h2>
          
          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4 md:p-2">
            <SearchForm />
          </div>
          
          {/* Property Type Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['Campsite', 'Cruise', 'Guesthouse', 'Homestay', 'Hotel', 'Penthouse', 'Resort', 'Villa'].map((type) => (
              <Link key={type} to={`/properties?type=${type.toLowerCase()}`} className="text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                {type}
              </Link>
            ))}
          </div>
          
          {/* Stats Counter */}
          <div className="mt-12 flex justify-center gap-12">
            <div className="text-center">
              <span className="block text-4xl font-bold text-white">15+</span>
              <span className="text-sm font-medium text-white/80">Properties</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-white">1K+</span>
              <span className="text-sm font-medium text-white/80">Happy Customers</span>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <FontAwesomeIcon icon={faChevronDown} className="text-2xl" />
        </div>
      </section>
      
      {/* Location Selection */}
      <LocationSelection />
      
      {/* Property Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3 text-center">Browse by Property Type</h2>
          <p className="text-gray-600 text-center mb-10">Find your perfect accommodation from our diverse selection</p>
          <div className="flex justify-center">
            <PropertyTypeFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>
        </div>
      </section>

      {/* Brand New Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3 text-center">Brand New Properties</h2>
          <p className="text-gray-600 text-center mb-10">Discover our latest additions for your next getaway</p>
          
          {isLoading ? (
            <div className="text-center py-12 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <p>Error loading properties. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProperties.slice(0, 4).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/properties" className="inline-block px-8 py-3 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-xl hover:translate-y-[-2px]">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Northeast India" 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Discover the warmth of local hospitality</h2>
              <div className="w-20 h-1 bg-primary-500 mb-6"></div>
              <p className="text-gray-700 mb-6">With Northeast India Homestays Book your perfect homestay experience today and make unforgettable memories in the heart of Northeast India.</p>
              <Link to="/about" className="inline-block px-8 py-3 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;