import supabase from "./db";
import { generateSlug } from "../../utils/Utils";

export async function getAllProperties(from, to, filter = null) {
  try {
    let query = supabase
      .from("properties")
      .select("*, rooms(id)", { count: "exact" })
      .order('created_at', { ascending: false });

    if (from !== undefined && to !== undefined) {
      query = query.range(from, to);
    }

    const { data: properties, error, count } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      throw new Error("Failed to fetch properties: " + error.message);
    }

    // Add rooms_count to each property
    const propertiesWithRoomCount = properties.map(property => ({
      ...property,
      rooms_count: property.rooms ? property.rooms.length : 0
    }));

    return { properties: propertiesWithRoomCount, count };
  } catch (error) {
    console.error('Error in getAllProperties:', error);
    throw new Error("Failed to fetch properties: " + error.message);
  }
}

export async function getPropertyById(id) {
  let { data: property, error } = await supabase.from("properties").select("*").eq("id", id).single();

  if (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }

  return property;
}

export async function getPropertyImages(id) {
  // Get the property with its images array
  let { data: property, error } = await supabase.from("properties").select("images").eq("id", id).single();
  
  if (error) {
    console.error('Error fetching property images:', error);
    return [];
  }
  
  return property?.images || [];
}

export async function createProperty(propertyObj, propertyThumbnail, propertyImages) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  try {
    let thumbnailName = null;
    let createdImages = [];
    
    // Handle thumbnail upload if provided
    if (propertyThumbnail) {
      thumbnailName = `${new Date().getTime()}-${propertyThumbnail.name}`;
      const { data: thumbnail, error: thumbnailError } = await supabase.storage
        .from("properties-imgs")
        .upload(thumbnailName, propertyThumbnail, {
          cacheControl: '3600',
          upsert: false
        });
      if (thumbnailError) {
        throw new Error(`Failed to upload thumbnail: ${thumbnailError.message}`);
      }
    }

    // Upload property images if provided
    if (propertyImages && propertyImages.length > 0) {
      for (const image of propertyImages) {
        const imgName = `${new Date().getTime()}-${image.name}`;
        const { error: imageError } = await supabase.storage
          .from("properties-imgs")
          .upload(imgName, image, {
            cacheControl: '3600',
            upsert: false
          });

        if (imageError) {
          throw new Error(`Failed to upload image: ${imageError.message}`);
        }
        createdImages.push(imgName);
      }
    }

    // Prepare property data for creation
    const propertyCols = {
      thumbnail: thumbnailName,
      name: propertyObj.name,
      description: propertyObj.description,
      address: propertyObj.address,
      city: propertyObj.city,
      state: propertyObj.state,
      pincode: propertyObj.pincode,
      landmark: propertyObj.landmark,
      property_type: propertyObj.property_type,
      status: propertyObj.status,
      bhk: propertyObj.bhk,
      images: createdImages,
      amenities: {
        wifi: propertyObj.amenities?.wifi || false,
        ac: propertyObj.amenities?.ac || false,
        tv: propertyObj.amenities?.tv || false,
        kitchen: propertyObj.amenities?.kitchen || false,
        parking: propertyObj.amenities?.parking || false,
        balcony: propertyObj.amenities?.balcony || false
      }
    };

    // Insert the property into the database
    const { data: property, error } = await supabase.from("properties").insert([propertyCols]).select();

    if (error) {
      throw new Error(`Failed to create property: ${error.message}`);
    }

    return property[0];
  } catch (error) {
    console.error('Error in createProperty:', error);
    throw error;
  }
}

export async function updateProperty(id, propertyObj, propertyThumbnail, propertyImages) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  try {
    let thumbnailName = propertyObj.thumbnail;
    let updatedImages = propertyObj.images || [];
    
    // Handle thumbnail upload if provided
    if (propertyThumbnail) {
      thumbnailName = `${new Date().getTime()}-${propertyThumbnail.name}`;
      const { data: thumbnail, error: thumbnailError } = await supabase.storage
        .from("properties-imgs")
        .upload(thumbnailName, propertyThumbnail, {
          cacheControl: '3600',
          upsert: false
        });
      if (thumbnailError) {
        throw new Error(`Failed to upload thumbnail: ${thumbnailError.message}`);
      }
    }

    // Upload property images if provided
    if (propertyImages && propertyImages.length > 0) {
      for (const image of propertyImages) {
        const imgName = `${new Date().getTime()}-${image.name}`;
        const { error: imageError } = await supabase.storage
          .from("properties-imgs")
          .upload(imgName, image, {
            cacheControl: '3600',
            upsert: false
          });

        if (imageError) {
          throw new Error(`Failed to upload image: ${imageError.message}`);
        }
        updatedImages.push(imgName);
      }
    }

    // Prepare property data for update
    const propertyUpdateCols = {
      thumbnail: thumbnailName,
      name: propertyObj.name,
      description: propertyObj.description,
      address: propertyObj.address,
      city: propertyObj.city,
      state: propertyObj.state,
      pincode: propertyObj.pincode,
      landmark: propertyObj.landmark,
      property_type: propertyObj.property_type,
      status: propertyObj.status,
      bhk: propertyObj.bhk,
      images: updatedImages,
      amenities: {
        wifi: propertyObj.amenities?.wifi || false,
        ac: propertyObj.amenities?.ac || false,
        tv: propertyObj.amenities?.tv || false,
        kitchen: propertyObj.amenities?.kitchen || false,
        parking: propertyObj.amenities?.parking || false,
        balcony: propertyObj.amenities?.balcony || false
      }
    };

    // Update the property in the database
    const { data: property, error } = await supabase
      .from("properties")
      .update(propertyUpdateCols)
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(`Failed to update property: ${error.message}`);
    }

    return property[0];
  } catch (error) {
    console.error('Error in updateProperty:', error);
    throw error;
  }
}

export async function deleteProperty(id) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  try {
    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete property: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error in deleteProperty:', error);
    throw error;
  }
}