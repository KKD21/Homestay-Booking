import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      // Toast is already handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !fullName) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, {
        full_name: fullName,
        phone: phoneNumber,
        nationality: 'Indian'
      });
      
      toast.success('Account created successfully! Please sign in.');
      setActiveTab('login');
    } catch (error) {
      console.error('Error signing up:', error);
      // Toast is already handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Home
            </Link>
            
            <h2 className="text-2xl font-semibold mb-6 text-center">Login to Your Account</h2>
            
            {/* Login Form */}
            {activeTab === 'login' && (
              <div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="search-input" 
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      className="search-input" 
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              </div>
            )}
            
            {/* Register Form */}
            {activeTab === 'register' && (
              <div>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="search-input" 
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      className="search-input" 
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                        +91
                      </span>
                      <input 
                        type="tel" 
                        className="search-input rounded-l-none" 
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;