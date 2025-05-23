import React from 'react';
import PropertyCard from '../ui/PropertyCard'; // Adjust path as necessary

// Placeholder data - replace with actual data fetching
const featuredPropertiesData = [
  {
    id: '1',
    slug: 'the-white-bungalow',
    name: 'The White Bungalow',
    address: 'the white bungalow, ...',
    city: 'Guwahati',
    state: 'Assam',
    price: 5500,
    thumbnail: 'https://staymoksha.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fstaymoksha%2Fimage%2Fupload%2Fv17003388 StayMoksha%2Fthe-white-bungalow%2Fthe-white-bungalow_cover.jpg&w=1920&q=75',
    new: true,
    // rating: 4.5,
    // reviewsCount: 120
  },
  {
    id: '2',
    slug: 'mv-namami-cruise',
    name: 'MV Namami Cruise | B...', // Truncated for display
    address: 'madhyam khanda ghat,...',
    city: 'Guwahati',
    state: 'Assam',
    price: 'Not specified', // Price might not always be a number
    thumbnail: 'https://staymoksha.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fstaymoksha%2Fimage%2Fupload%2Fv17003388 StayMoksha%2Fmv-namami-cruise%2Fmv-namami-cruise_cover.jpg&w=1920&q=75',
    new: true,
  },
  {
    id: '3',
    slug: 'avantis-homestay',
    name: 'Avantis Homestay | K...',
    address: 'kharghuli hills, Guw...',
    city: 'Guwahati',
    state: 'Assam',
    price: 'Not specified',
    thumbnail: 'https://staymoksha.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fstaymoksha%2Fimage%2Fupload%2Fv17003388 StayMoksha%2Favantis-homestay%2Favantis-homestay_cover.jpg&w=1920&q=75',
    new: true,
  },
  {
    id: '4',
    slug: 'nilachal-homes',
    name: 'Nilachal Homes | Kam...',
    address: '40 Lakhi Path Kamakh...',
    city: 'Guwahati',
    state: 'Assam',
    price: 1500,
    thumbnail: 'https://staymoksha.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fstaymoksha%2Fimage%2Fupload%2Fv17003388 StayMoksha%2Fnilachal-homes%2Fnilachal-homes_cover.jpg&w=1920&q=75',
    new: false,
  },
  // Add more placeholder properties as needed
];

const FeaturedProperties = () => {
  // In a real app, you would fetch this data from an API
  // const { data: properties, isLoading, error } = useQuery('featuredProperties', fetchFeaturedProperties);

  // if (isLoading) return <p>Loading featured properties...</p>;
  // if (error) return <p>Error loading properties.</p>;

  const propertiesToDisplay = featuredPropertiesData; // Use placeholder data for now

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* The title "Brand new properties" is already in PropertyTypeFilter, 
            so we might not need another title here if they are used together.
            If this section is standalone, a title would be good. 
            For now, assuming it's part of the flow after filters.
        */}
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Properties</h2> */}
        
        {propertiesToDisplay && propertiesToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {propertiesToDisplay.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No featured properties available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;