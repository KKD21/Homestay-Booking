import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are missing. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch all properties
 * @param {Object} filters - Optional filters for properties
 * @returns {Promise<Array>} - Array of properties
 */
export const getProperties = async (filters = {}) => {
  let query = supabase
    .from('properties')
    .select(`
      *,
      rooms (*)
    `)
    .eq('status', 'available');

  // Apply filters if provided
  if (filters.propertyType) {
    query = query.eq('property_type', filters.propertyType);
  }

  if (filters.city) {
    query = query.eq('city', filters.city);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }

  return data || [];
};

/**
 * Fetch a single property by ID
 * @param {number} id - Property ID
 * @returns {Promise<Object>} - Property object
 */
export const getPropertyById = async (id) => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      rooms (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    throw new Error('Failed to fetch property');
  }

  return data;
};

/**
 * Create a reservation
 * @param {Object} reservationData - Reservation data
 * @returns {Promise<Object>} - Created reservation
 */
export const createReservation = async (reservationData) => {
  const { data, error } = await supabase
    .from('reservations')
    .insert([
      reservationData
    ])
    .select();

  if (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Failed to create reservation');
  }

  return data[0];
};

/**
 * Create or update guest information
 * @param {Object} guestData - Guest data
 * @returns {Promise<Object>} - Created or updated guest
 */
export const saveGuestInfo = async (guestData) => {
  // Check if guest already exists with the given email
  const { data: existingGuest } = await supabase
    .from('guests')
    .select('*')
    .eq('email', guestData.email)
    .maybeSingle();

  if (existingGuest) {
    // Update existing guest
    const { data, error } = await supabase
      .from('guests')
      .update(guestData)
      .eq('id', existingGuest.id)
      .select();

    if (error) {
      console.error('Error updating guest:', error);
      throw new Error('Failed to update guest information');
    }

    return data[0];
  } else {
    // Create new guest
    const { data, error } = await supabase
      .from('guests')
      .insert([guestData])
      .select();

    if (error) {
      console.error('Error creating guest:', error);
      throw new Error('Failed to save guest information');
    }

    return data[0];
  }
};

/**
 * Send a contact message
 * @param {Object} messageData - Message data
 * @returns {Promise<Object>} - Created message
 */
export const sendContactMessage = async (messageData) => {
  const { data, error } = await supabase
    .from('inbox')
    .insert([messageData])
    .select();

  if (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }

  return data[0];
};