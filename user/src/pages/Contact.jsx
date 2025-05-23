import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Banner */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">REACHING OUT</h1>
          <p className="text-xl">Get in touch with us for any inquiries or bookings</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Subject"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-600 p-3 rounded-full text-white mr-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Our Location</h3>
                  <p className="text-gray-600 mt-1">Staymoksha headquarter, House number na 26, West Jyotinagar, Bamunimaidan, Guwahati, Assam 781004</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-600 p-3 rounded-full text-white mr-4">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Phone Number</h3>
                  <p className="text-gray-600 mt-1">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary-600 p-3 rounded-full text-white mr-4">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email Address</h3>
                  <p className="text-gray-600 mt-1">info@staymoksha.com</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 h-64 bg-gray-200 rounded-lg">
              {/* Map will be integrated here */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Google Map will be integrated here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;