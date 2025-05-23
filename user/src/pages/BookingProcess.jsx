import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarDays, faUsers, faCheck } from '@fortawesome/free-solid-svg-icons';
import { createReservation, saveGuestInfo } from '../services/propertyService';
import { toast } from 'react-hot-toast';

const BookingProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    fullname: '',
    email: '',
    phone: '',
    nationality: 'Indian',
    nationalID: '',
  });
  
  // Calculate total price and nights
  const checkInDate = new Date(bookingData?.checkInDate);
  const checkOutDate = new Date(bookingData?.checkOutDate);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const totalPrice = bookingData?.roomPrice * nights;
  
  const createReservationMutation = useMutation({
    mutationFn: async (data) => {
      // First save guest info
      const guest = await saveGuestInfo(guestInfo);
      
      // Then create reservation
      return createReservation({
        guest_id: guest.id,
        room_id: data.roomId,
        check_in: data.checkInDate,
        check_out: data.checkOutDate,
        guests_count: data.guestsCount,
        reserved_price: data.totalPrice,
        status: 'pending'
      });
    },
    onSuccess: () => {
      toast.success('Booking successful!');
      setStep(3); // Move to confirmation step
    },
    onError: (error) => {
      toast.error('Failed to complete booking. Please try again.');
      console.error('Booking error:', error);
    }
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate guest info
      if (!guestInfo.fullname || !guestInfo.email || !guestInfo.phone) {
        toast.error('Please fill in all required fields');
        return;
      }
      setStep(2); // Move to payment step
    } else if (step === 2) {
      // Submit reservation
      createReservationMutation.mutate({
        roomId: bookingData.roomId,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guestsCount: bookingData.guestsCount,
        totalPrice: totalPrice
      });
    }
  };
  
  if (!bookingData) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <p>No booking information found. Please select a property first.</p>
          <Link to="/properties" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back button */}
        {step === 1 && (
          <Link to={`/properties/${bookingData.propertyId}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Property
          </Link>
        )}
        
        {/* Booking steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className={`w-20 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <div className={`w-20 h-1 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Step 1: Guest Information */}
          {step === 1 && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Guest Information</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <p className="mb-1"><span className="font-medium">Property:</span> {bookingData.propertyName}</p>
                <p className="mb-1"><span className="font-medium">Check-in:</span> {new Date(bookingData.checkInDate).toLocaleDateString()}</p>
                <p className="mb-1"><span className="font-medium">Check-out:</span> {new Date(bookingData.checkOutDate).toLocaleDateString()}</p>
                <p className="mb-1"><span className="font-medium">Guests:</span> {bookingData.guestsCount}</p>
                <p className="mb-1"><span className="font-medium">Nights:</span> {nights}</p>
                <p className="text-lg font-bold text-primary-600 mt-2">Total: ₹{totalPrice}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullname"
                      value={guestInfo.fullname}
                      onChange={handleInputChange}
                      className="search-input" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={guestInfo.email}
                      onChange={handleInputChange}
                      className="search-input" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={guestInfo.phone}
                      onChange={handleInputChange}
                      className="search-input" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <input 
                      type="text" 
                      name="nationality"
                      value={guestInfo.nationality}
                      onChange={handleInputChange}
                      className="search-input" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Number (Optional)</label>
                    <input 
                      type="text" 
                      name="nationalID"
                      value={guestInfo.nationalID}
                      onChange={handleInputChange}
                      className="search-input" 
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors mt-6"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          )}
          
          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <p className="mb-1"><span className="font-medium">Guest:</span> {guestInfo.fullname}</p>
                <p className="mb-1"><span className="font-medium">Property:</span> {bookingData.propertyName}</p>
                <p className="mb-1"><span className="font-medium">Check-in:</span> {new Date(bookingData.checkInDate).toLocaleDateString()}</p>
                <p className="mb-1"><span className="font-medium">Check-out:</span> {new Date(bookingData.checkOutDate).toLocaleDateString()}</p>
                <p className="mb-1"><span className="font-medium">Guests:</span> {bookingData.guestsCount}</p>
                <p className="mb-1"><span className="font-medium">Nights:</span> {nights}</p>
                <p className="text-lg font-bold text-primary-600 mt-2">Total: ₹{totalPrice}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <p className="text-center text-gray-600 mb-4">
                    This is a demo application. No actual payment will be processed.
                  </p>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="font-medium mb-2">Payment Method</p>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="pay-later" 
                        name="payment-method" 
                        className="mr-2" 
                        checked 
                        readOnly
                      />
                      <label htmlFor="pay-later">Pay at Property</label>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors mt-6"
                  disabled={createReservationMutation.isPending}
                >
                  {createReservationMutation.isPending ? 'Processing...' : 'Complete Booking'}
                </button>
              </form>
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCheck} className="text-green-600 text-2xl" />
              </div>
              
              <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">Your reservation has been successfully completed.</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <h3 className="font-semibold mb-2">Booking Details</h3>
                <p className="mb-1"><span className="font-medium">Guest:</span> {guestInfo.fullname}</p>
                <p className="mb-1"><span className="font-medium">Property:</span> {bookingData.propertyName}</p>
                <p className="mb-1"><span className="font-medium">Check-in:</span> {new Date(bookingData.checkInDate).toLocaleDateString()}</p>
                <p className="mb-1"><span className="font-medium">Check-out:</span> {new Date(bookingData.checkOutDate).toLocaleDateString()}</p>
                <p className="mb-1"><span className="font-medium">Guests:</span> {bookingData.guestsCount}</p>
                <p className="text-lg font-bold text-primary-600 mt-2">Total: ₹{totalPrice}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/" 
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Back to Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  View My Bookings
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;