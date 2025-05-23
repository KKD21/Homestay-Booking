import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Default placeholder image if property.thumbnail is not available
  const imageUrl = property.thumbnail || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

  // Basic check for 'new' status
  const isNew = property.new || (property.createdAt && new Date(property.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    console.log('Favorite clicked for', property.id);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toLocaleString();
    }
    return price === 'Not specified' ? 'Contact for price' : price;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
      <Link to={`/properties/${property.slug || property.id}`} className="block">
        <div className="relative h-64 w-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={property.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* New badge */}
          {isNew && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                New
              </span>
            </div>
          )}
          
          {/* Favorite button */}
          <button 
            className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
            onClick={handleFavoriteClick}
            aria-label="Add to favorites"
          >
            {isFavorite ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>
          
          {/* Quick view button - appears on hover */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <button className="w-full bg-white/95 backdrop-blur-sm text-gray-800 font-semibold py-2.5 px-4 rounded-xl hover:bg-white transition-colors duration-200 shadow-lg">
              Quick View
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Property name */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
            {property.name}
          </h3>
          
          {/* Location */}
          <div className="flex items-center text-gray-500 mb-3">
            <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            <p className="text-sm truncate">
              {property.address || `${property.city}, ${property.state}`}
            </p>
          </div>
          
          {/* Rating - placeholder for future implementation */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 font-medium">4.8 (124 reviews)</span>
          </div>
          
          {/* Price and booking */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {typeof property.price === 'number' ? `₹${formatPrice(property.price)}` : formatPrice(property.price)}
              </span>
              {typeof property.price === 'number' && (
                <span className="text-sm text-gray-500 ml-1">/night</span>
              )}
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Starting from</div>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;