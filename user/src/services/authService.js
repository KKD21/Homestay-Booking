import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are missing. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Get the current logged in user
 * @returns {Promise<Object>} - User object or null
 */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/**
 * Get user profile data
 * @returns {Promise<Object>} - User profile data
 */
export const getUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} - Updated profile
 */
export const updateUserProfile = async (profileData) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', user.id)
    .select();
    
  if (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
  
  return data[0];
};

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Session data
 */
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Error signing in:', error);
    throw new Error(error.message);
  }
  
  return data;
};

/**
 * Sign up with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} profileData - Initial profile data
 * @returns {Promise<Object>} - User data
 */
export const signUpWithEmail = async (email, password, profileData) => {
  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (authError) {
    console.error('Error signing up:', authError);
    throw new Error(authError.message);
  }
  
  // If successful, create profile
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: authData.user.id,
        ...profileData
      }]);
      
    if (profileError) {
      console.error('Error creating profile:', profileError);
      // We don't throw here as the auth was successful
    }
  }
  
  return authData;
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out');
  }
};

/**
 * Get user bookings
 * @returns {Promise<Array>} - Array of user bookings
 */
export const getUserBookings = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];
  
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      rooms (name, price),
      properties (name, city, state)
    `)
    .eq('guest_id', user.id)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user bookings:', error);
    throw new Error('Failed to fetch bookings');
  }
  
  return data.map(booking => ({
    id: booking.id,
    propertyName: booking.properties.name,
    propertyLocation: `${booking.properties.city}, ${booking.properties.state}`,
    checkIn: booking.check_in,
    checkOut: booking.check_out,
    status: booking.status,
    totalPrice: booking.reserved_price,
    roomName: booking.rooms.name
  }));
};