import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faCalendarDays, faUsers, faHeart, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

// Import brand configuration
import brandConfig from '../../config/brandConfig';

// Import logo assets dynamically based on brand config
import logoSvg from '../../assets/logo.svg';
import logoWhiteSvg from '../../assets/logo-white.svg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={isScrolled ? logoSvg : logoWhiteSvg} alt={brandConfig.businessShortName} className="h-10" />
          <span className={`ml-2 font-bold text-xl ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{brandConfig.businessName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => 
            `font-medium transition-colors ${isScrolled 
              ? (isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600') 
              : (isActive ? 'text-white font-bold' : 'text-white hover:text-gray-200')}`
          }>
            Home
          </NavLink>
          <NavLink to="/properties" className={({ isActive }) => 
            `font-medium transition-colors ${isScrolled 
              ? (isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600') 
              : (isActive ? 'text-white font-bold' : 'text-white hover:text-gray-200')}`
          }>
            Properties
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => 
            `font-medium transition-colors ${isScrolled 
              ? (isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600') 
              : (isActive ? 'text-white font-bold' : 'text-white hover:text-gray-200')}`
          }>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => 
            `font-medium transition-colors ${isScrolled 
              ? (isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600') 
              : (isActive ? 'text-white font-bold' : 'text-white hover:text-gray-200')}`
          }>
            Contact
          </NavLink>
          <Link to="/login" className={`ml-4 px-5 py-2 rounded-md font-medium transition-colors ${isScrolled ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-white text-gray-800 hover:bg-gray-100'}`}>
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon 
            icon={mobileMenuOpen ? faXmark : faBars} 
            className={isScrolled ? 'text-gray-800' : 'text-white'} 
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col space-y-4 py-2">
            <NavLink to="/" className={({ isActive }) => 
              `py-2 font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
            } onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/properties" className={({ isActive }) => 
              `py-2 font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
            } onClick={() => setMobileMenuOpen(false)}>
              Properties
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => 
              `py-2 font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
            } onClick={() => setMobileMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => 
              `py-2 font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
            } onClick={() => setMobileMenuOpen(false)}>
              Contact
            </NavLink>
            <Link to="/login" className="py-2 font-medium text-primary-600 hover:text-primary-700" onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img src={logoWhiteSvg} alt={brandConfig.businessShortName} className="h-10" />
              <span className="ml-3 font-bold text-xl tracking-wide text-white">{brandConfig.businessName}</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{brandConfig.businessDescription}</p>
            <div className="flex space-x-5">
              <a href={brandConfig.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href={brandConfig.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a href={brandConfig.socialMedia.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors inline-block">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition-colors inline-block">Properties</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors inline-block">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors inline-block">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Popular Destinations</h3>
            <ul className="space-y-3">
              {brandConfig.popularDestinations.map((destination) => (
                <li key={destination.id}>
                  <Link to={`/properties?location=${destination.id}`} className="text-gray-300 hover:text-white transition-colors inline-block uppercase text-sm tracking-wider">
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">{brandConfig.officeAddress}</p>
            <p className="text-gray-300 mb-4">Email: <a href={`mailto:${brandConfig.email}`} className="hover:text-white transition-colors">{brandConfig.email}</a></p>
            <p className="text-gray-300">Phone: <a href={`tel:${brandConfig.phone}`} className="hover:text-white transition-colors">{brandConfig.phone}</a></p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {brandConfig.copyrightYear} {brandConfig.businessName}. {brandConfig.copyrightText}</p>
          <div className="mt-4">
            <Link to={brandConfig.legalLinks.privacyPolicy} className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
            <span className="mx-3">|</span>
            <Link to={brandConfig.legalLinks.termsConditions} className="text-gray-300 hover:text-white transition-colors">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;