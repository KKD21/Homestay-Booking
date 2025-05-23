import React from 'react';
import Hero from '../components/home/Hero';
import PropertyTypeFilter from '../components/home/PropertyTypeFilter';
import FeaturedProperties from '../components/home/FeaturedProperties';
import LocationScroller from '../components/home/LocationScroller';

const HomePage = () => {
  const handleFilterChange = (type) => {
    console.log('Selected property type:', type);
    // Here you would typically fetch or filter properties based on the selected type
  };

  return (
    <div>
      <Hero />
      <LocationScroller /> 
      {/* PropertyTypeFilter and FeaturedProperties are often used together */}
      <div className="bg-gray-50">
        <PropertyTypeFilter onFilterChange={handleFilterChange} />
        <FeaturedProperties /> 
      </div>
      
      {/* Placeholder for other sections like Testimonials, About, etc. */}
      {/* <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Guests Say</h2>
          {/* Testimonials component would go here */}
        </div>
      </div> */}

      {/* <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About StayMoksha</h2>
          {/* About section component would go here */}
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;