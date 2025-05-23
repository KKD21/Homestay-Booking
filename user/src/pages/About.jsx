import React from 'react';

const About = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Banner */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">ABOUT US</h1>
          <p className="text-xl">Learn more about Stay Moksha and our story</p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Stay Moksha was founded with a vision to provide authentic and memorable homestay experiences across India. 
                Our journey began with a passion for hospitality and a deep appreciation for local cultures and traditions.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that travel is not just about visiting places, but about immersing yourself in the local way of life. 
                Our carefully curated properties offer guests the opportunity to experience the warmth of Indian hospitality 
                while enjoying modern comforts and amenities.
              </p>
              <p className="text-gray-600">
                Whether you're looking for a peaceful retreat in the mountains, a beachside getaway, or a cultural experience 
                in a historic city, Stay Moksha has the perfect accommodation for your needs. Our team is dedicated to ensuring 
                that every stay is comfortable, authentic, and memorable.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/src/assets/about-image.jpg" 
                alt="Stay Moksha Experience" 
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Stay+Moksha';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Authenticity</h3>
              <p className="text-gray-600">
                We believe in providing genuine experiences that reflect the true essence of each location. 
                Our properties maintain their local character while offering modern comforts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Sustainability</h3>
              <p className="text-gray-600">
                We are committed to sustainable tourism practices that respect local communities and the environment. 
                We work with property owners who share our commitment to responsible hospitality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Exceptional Service</h3>
              <p className="text-gray-600">
                We strive to provide outstanding service at every touchpoint. From booking to check-out, 
                our team is dedicated to ensuring that your stay exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <img 
                  src="/src/assets/team-1.jpg" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200x200?text=Team+Member';
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Rahul Sharma</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <img 
                  src="/src/assets/team-2.jpg" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200x200?text=Team+Member';
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Priya Patel</h3>
              <p className="text-gray-600">Operations Manager</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <img 
                  src="/src/assets/team-3.jpg" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200x200?text=Team+Member';
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Amit Kumar</h3>
              <p className="text-gray-600">Customer Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;