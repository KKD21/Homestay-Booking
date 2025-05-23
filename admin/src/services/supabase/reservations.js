import { formatISO, formatISO9075 } from "date-fns";
import supabase from "./db";
import { data } from "autoprefixer";

export async function getRoomReservations(id) {
  let { data: reservations, error } = await supabase.from("reservations").select("*").eq("room_id", id);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return reservations;
}

export async function getGuestReservations(guest_id) {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*, rooms(name, capacity, property_id, properties(thumbnail))")
    .eq("guest_id", guest_id)
    .is("deleted_at", null);

  if (error) {
    console.log("SUPABASE ERROR");
    console.log(error);
  }

  return reservations;
}
/**
 * fullname,
  email,
  phone,
  nationality,
  countryFlag,
  reserved_price,
 */

export async function createNewReservation(
  room_id,
  guest_id,
  guests_count,
  reserved_price,
  start_date,
  end_date,
  status
) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  try {
    // Format dates safely
    let formattedStartDate = null;
    let formattedEndDate = null;
    
    try {
      formattedStartDate = start_date instanceof Date 
        ? formatISO9075(start_date) 
        : (start_date ? formatISO9075(new Date(start_date)) : null);
      
      formattedEndDate = end_date instanceof Date 
        ? formatISO9075(end_date) 
        : (end_date ? formatISO9075(new Date(end_date)) : null);
    } catch (dateError) {
      console.error("Date formatting error:", dateError);
      throw new Error("Invalid date format. Please select valid dates.");
    }
    
    // Ensure reserved_price is a number
    const numericPrice = typeof reserved_price === 'string' ? Number(reserved_price) : reserved_price;
    
    if (isNaN(numericPrice)) {
      throw new Error("Price must be a valid number");
    }
    
    const { data: reservations, error } = await supabase
      .from("reservations")
      .insert([
        {
          room_id,
          guest_id,
          guests_count,
          reserved_price: numericPrice,
          check_in: formattedStartDate,
          check_out: formattedEndDate,
          status
        },
      ])
      .select();
      
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    
    return reservations;
  } catch (err) {
    console.error("Reservation creation error:", err);
    throw err;
  }
}

export async function deleteReservation(id, wasDeletedByGuest) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  // FOR DELETION IM USING SOFT DELETE
  // ACTUAL DELETE WILL ONLY HAPPEN IN CASE IF THE CLIENT HAS ALREADY DELETED RESERVATION FROM HIS HISTORY
  if (wasDeletedByGuest) {
    const { error, data: reservations } = await supabase.from("reservations").delete().eq("id", id).select();
    
    if (error) {
      console.error("Error deleting reservation:", error);
      throw new Error(error.message || "Failed to delete the reservation");
    }
    
    if (!reservations || reservations.length === 0) {
      throw new Error("Failed to delete the reservation. The reservation may not exist.");
    }
    
    return reservations;
  } else {
    const { data: reservations, error } = await supabase
      .from("reservations")
      .update({ admin_deleted_at: formatISO9075(new Date()) })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error soft-deleting reservation:", error);
      throw new Error(error.message || "Failed to delete the reservation");
    }
    
    if (!reservations || reservations.length === 0) {
      throw new Error("Failed to delete the reservation. The reservation may not exist.");
    }
    
    return reservations;
  }
}

export async function getReservationByID(id) {
  let { data: reservations, error } = await supabase
    .from("reservations")
    .select("*, rooms(name, capacity, price), guests(fullname, phone)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return reservations;
}

export async function getAllReservation(from, to, search) {
  let query = supabase
    .from("reservations")
    .select("*, rooms(name, capacity, price, property_id, properties(thumbnail))", { count: "exact" })
    .is("admin_deleted_at", null)
    .order("id", { ascending: false });

  if (search) {
    query = query.or(`guest_fullname.ilike.%${search}%`);
  }

  if (from !== undefined && to !== undefined) query.range(from, to);

  const { data: reservations, error, count } = await query;

  if (error) {
    console.log(error);
  }

  return { reservations, count };
}

export async function updateReseration(id, room_id, guest_id, guests_count, start_date, end_date, status) {
  const authUser = await supabase.auth.getUser();

  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");
  
  try {
    // Format dates safely
    let formattedStartDate = null;
    let formattedEndDate = null;
    
    try {
      formattedStartDate = start_date instanceof Date 
        ? formatISO9075(start_date) 
        : (start_date ? formatISO9075(new Date(start_date)) : null);
      
      formattedEndDate = end_date instanceof Date 
        ? formatISO9075(end_date) 
        : (end_date ? formatISO9075(new Date(end_date)) : null);
    } catch (dateError) {
      console.error("Date formatting error:", dateError);
      throw new Error("Invalid date format. Please select valid dates.");
    }
    
    const { data: reservations, error } = await supabase
      .from("reservations")
      .update({
        guests_count,
        room_id,
        guest_id,
        check_in: formattedStartDate,
        check_out: formattedEndDate,
        status,
      })
      .eq("id", id)
      .select();

    if (error || !reservations.length) {
      console.error("Error updating reservation:", error);
      throw new Error(error?.message || "Failed to update reservation");
    }
    
    return reservations;
  } catch (err) {
    console.error("Reservation update error:", err);
    throw err;
  }

  return reservations;
}
