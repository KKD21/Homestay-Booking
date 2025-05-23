import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUsers, faWifi, faCar, faSnowflake, faTv, faUtensils, faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getPropertyById } from '../services/propertyService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(parseInt(id)),
  });

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate || !selectedRoomId) {
      alert('Please select check-in, check-out dates and a room');
      return;
    }
    
    navigate(`/booking/${property.id}`, {
      state: {
        propertyId: property.id,
        roomId: selectedRoomId,
        checkInDate,
        checkOutDate,
        guestsCount,
        propertyName: property.name,
        roomPrice: property.rooms.find(room => room.id === selectedRoomId)?.price || 0
      }
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-24 flex justify-center">Loading property details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center text-red-500">
          <p>Error loading property details. Please try again later.</p>
          <Link to="/properties" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <p>Property not found.</p>
          <Link to="/properties" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link to="/properties" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Properties
        </Link>
        
        {/* Property title and location */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
          <p className="text-gray-600 flex items-center">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            {property.address}, {property.city}, {property.state}
          </p>
        </div>
        
        {/* Property images */}
        <div className="mb-8">
          {property.images && property.images.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="rounded-lg overflow-hidden h-96"
            >
              {property.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img 
                    src={image} 
                    alt={`${property.name} - Image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img 
              src={property.thumbnail || 'https://via.placeholder.com/800x400?text=No+Image+Available'} 
              alt={property.name} 
              className="w-full h-96 object-cover rounded-lg"
            />
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property details */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-700 mb-6">{property.description || 'No description available.'}</p>
              
              {/* Amenities */}
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {property.amenities?.wifi && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faWifi} className="text-primary-600 mr-2" />
                    <span>Free WiFi</span>
                  </div>
                )}
                {property.amenities?.parking && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCar} className="text-primary-600 mr-2" />
                    <span>Parking</span>
                  </div>
                )}
                {property.amenities?.ac && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faSnowflake} className="text-primary-600 mr-2" />
                    <span>Air Conditioning</span>
                  </div>
                )}
                {property.amenities?.tv && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faTv} className="text-primary-600 mr-2" />
                    <span>TV</span>
                  </div>
                )}
                {property.amenities?.kitchen && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUtensils} className="text-primary-600 mr-2" />
                    <span>Kitchen</span>
                  </div>
                )}
              </div>
              
              {/* Landmark */}
              {property.landmark && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Landmark</h3>
                  <p className="text-gray-700">{property.landmark}</p>
                </div>
              )}
            </div>
            
            {/* Available Rooms */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
              
              {property.rooms && property.rooms.length > 0 ? (
                <div className="space-y-4">
                  {property.rooms.map(room => (
                    <div 
                      key={room.id} 
                      className={`border rounded-lg p-4 transition-colors ${selectedRoomId === room.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                      onClick={() => setSelectedRoomId(room.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{room.name}</h3>
                          <p className="text-gray-600 mb-2">{room.room_type}</p>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className="mr-4">{room.bed_count} {room.bed_type}</span>
                            <span>Sleeps {room.sleeps}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary-600">₹{room.price}<span className="text-sm font-normal text-gray-500">/night</span></p>
                          {room.discount > 0 && (
                            <p className="text-sm text-green-600">{room.discount}% off</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No rooms available for this property.</p>
              )}
            </div>
          </div>
          
          {/* Booking form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Book this property</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCalendarDays} className="absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="date" 
                      className="search-input pl-10" 
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCalendarDays} className="absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="date" 
                      className="search-input pl-10" 
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUsers} className="absolute left-3 top-3 text-gray-400" />
                    <select 
                      className="search-input pl-10" 
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {selectedRoomId && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Selected Room:</span>
                      <span className="font-medium">{property.rooms.find(room => room.id === selectedRoomId)?.name}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Price per night:</span>
                      <span className="font-medium">₹{property.rooms.find(room => room.id === selectedRoomId)?.price}</span>
                    </div>
                  </div>
                )}
                
                <button 
                  className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors"
                  onClick={handleBookNow}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;