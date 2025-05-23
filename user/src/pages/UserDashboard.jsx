import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClockRotateLeft, faHeart, faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { getUserBookings } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

// Fetch user bookings from Supabase
const fetchUserBookings = async () => {
  try {
    return await getUserBookings();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};


const UserProfile = () => {
  const { getUserProfile, updateProfile } = useAuth();
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    phone: '',
    nationality: 'Indian'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await getUserProfile();
        if (profile) {
          setUserInfo({
            full_name: profile.full_name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            nationality: profile.nationality || 'Indian'
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile information');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [getUserProfile]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(userInfo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="full_name"
              value={userInfo.full_name}
              onChange={handleInputChange}
              className="search-input" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="search-input" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="tel" 
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className="search-input" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <input 
              type="text" 
              name="nationality"
              value={userInfo.nationality}
              onChange={handleInputChange}
              className="search-input" 
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              type="submit" 
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Save Changes
            </button>
            <button 
              type="button" 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{userInfo.full_name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{userInfo.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{userInfo.phone}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Nationality</p>
              <p className="font-medium">{userInfo.nationality}</p>
            </div>
          </div>
          
          <button 
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors mt-2"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

const BookingHistory = () => {
  const { data: bookings = [], isLoading, error, refetch } = useQuery({
    queryKey: ['userBookings'],
    queryFn: fetchUserBookings,
    refetchOnWindowFocus: false,
    retry: 1
  });
  
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Date formatting error:', e);
      return dateString;
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading your bookings...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-red-500 mb-4">Error loading bookings</div>
        <p className="text-gray-600 mb-4">{error.message || 'Please try again later.'}</p>
        <button 
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
        <Link 
          to="/properties" 
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Browse Properties
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <div key={booking.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-primary-500">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg">{booking.propertyName}</h4>
              <p className="text-gray-600">{booking.propertyLocation}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : booking.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Check-in</p>
              <p>{formatDate(booking.checkIn)}</p>
            </div>
            <div>
              <p className="text-gray-500">Check-out</p>
              <p>{formatDate(booking.checkOut)}</p>
            </div>
            <div>
              <p className="text-gray-500">Room</p>
              <p>{booking.roomName || 'Standard Room'}</p>
            </div>
            <div>
              <p className="text-gray-500">Total</p>
              <p className="font-medium">₹{booking.totalPrice.toLocaleString('en-IN')}</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Link 
              to={`/booking/${booking.id}`} 
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const { getUserProfile, signOut, user } = useAuth();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchUserData = async () => {
      try {
        const profile = await getUserProfile();
        if (profile) {
          setUserName(profile.full_name || 'User');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [user, getUserProfile, navigate]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{userName}</p>
                    <p className="text-sm text-gray-500">Member since {new Date().getFullYear()}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-2">
                  <button 
                    className="w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-gray-50 text-red-600"
                    onClick={handleSignOut}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                    Sign Out
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'bookings' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    <FontAwesomeIcon icon={faClockRotateLeft} className="mr-3" />
                    My Bookings
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'profile' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-3" />
                    Profile
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'wishlist' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <FontAwesomeIcon icon={faHeart} className="mr-3" />
                    Wishlist
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
                <BookingHistory />
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Profile</h2>
                <UserProfile />
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
                  <Link 
                    to="/properties" 
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Browse Properties
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;