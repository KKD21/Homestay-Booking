import { generateSlug } from "../../utils/Utils";
import supabase from "./db";

export async function getAllRooms(from, to, filter = null) {
  try {
    let query = supabase
      .from("rooms")
      .select("*, reservations(id, check_in, check_out, status), properties(id, name)", { count: "exact" })
      .order('created_at', { ascending: false });

    if (from !== undefined && to !== undefined) {
      query = query.range(from, to);
    }

    const { data: rooms, error, count } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      throw new Error("Failed to fetch rooms: " + error.message);
    }

    // Add property_name to each room for easier display
    const processedRooms = rooms.map(room => ({
      ...room,
      property_name: room.properties?.name
    }));

    return { rooms: processedRooms, count };
  } catch (error) {
    console.error('Error in getAllRooms:', error);
    throw new Error("Failed to fetch rooms: " + error.message);
  }
}

export async function getRoomById(id) {
  let { data: room, error } = await supabase.from("rooms").select("*, properties(id, name)").eq("id", id).single();

  if (error) {
    console.error('Error fetching room by ID:', error);
    return null;
  }
  
  // Add property_name for consistency with getAllRooms
  if (room && room.properties) {
    room.property_name = room.properties.name;
  }

  return room;
}

export async function getRoomImages(id) {
  // Get the room with its images array
  let { data: room, error } = await supabase.from("rooms").select("images").eq("id", id).single();
  
  if (error) {
    console.error('Error fetching room images:', error);
    return [];
  }
  
  return room?.images || [];
}

export async function getAllRoomsByPropertyId(propertyId) {
  try {
    if (!propertyId) return [];
    
    const { data: rooms, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("property_id", propertyId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching rooms by property ID:', error);
      throw new Error("Failed to fetch property rooms: " + error.message);
    }

    return rooms || [];
  } catch (error) {
    console.error('Error in getAllRoomsByPropertyId:', error);
    throw new Error("Failed to fetch property rooms: " + error.message);
  }
}

export async function createRoom(roomObj) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  try {
    // Prepare room data for creation - removed address, description, images, thumbnail, and amenities
    const roomCols = {
      name: roomObj.name,
      capacity: roomObj.capacity,
      price: roomObj.price,
      sleeps: roomObj.sleeps || 1,
      available: true,
      discount: roomObj.discount || 0,
      slug: generateSlug(roomObj.name),
      status: roomObj.status || "available",
      // Property-room relationship fields
      property_id: roomObj.property_id || null,
      bed_type: roomObj.bed_type || null,
      bed_count: roomObj.bed_count || 1,
      room_type: roomObj.room_type || null
    };

    // Insert room data
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .insert([roomCols])
      .select()
      .single();

    if (roomError) {
      throw new Error(`Failed to create room: ${roomError.message}`);
    }

    return room;
  } catch (error) {
    console.error('Error in createRoom:', error);
    throw error;
  }
}


export async function deleteRoom(id) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");
  const { data: room, error } = await supabase.from("rooms").delete().eq("id", id).select();

  if (error) {
    console.error("Error deleting room:", error);
    throw new Error(error.message || "Failed to delete the room");
  }

  if (!room || room.length === 0) {
    throw new Error("Failed to delete the room. The room may have associated reservations.");
  }
  
  return room[0] || room; // Return the first room object or the entire array
}

export async function updateRoom(id, roomObj) {
  // Validate ID to prevent undefined ID errors
  if (!id) throw new Error("Room ID is required");
  
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");
  
  try {
    // Prepare room data for update - removed address, description, images, thumbnail, and amenities
    const roomCols = {
      name: roomObj.name,
      capacity: roomObj.capacity,
      price: roomObj.price,
      sleeps: roomObj.sleeps || 1,
      discount: roomObj.discount || 0,
      slug: generateSlug(roomObj.name),
      status: roomObj.status || "available",
      // Property-room relationship fields
      property_id: roomObj.property_id || null,
      bed_type: roomObj.bed_type || null,
      bed_count: roomObj.bed_count || 1,
      room_type: roomObj.room_type || null
    };

    // Update room data
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .update(roomCols)
      .eq("id", id)
      .select();

    if (roomError) {
      throw new Error(`Failed to update room: ${roomError.message}`);
    }
    
    if (!room || room.length === 0) {
      throw new Error("Room not found or update failed");
    }

    return room[0];
  } catch (error) {
    console.error('Error in updateRoom:', error);
    throw error;
  }
}
