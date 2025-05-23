import supabase from "./db";

export async function getGuestById(id) {
  if (isNaN(Number(id))) throw new Error("Invalid guest id");

  try {
    const { data: guests, error } = await supabase
      .from("guests")
      .select("*")
      .eq("id", id);

    if (error) throw new Error(error.message);
    return guests;
  } catch (err) {
    throw new Error(`Failed to retrieve guests: ${err.message}`);
  }
}

export async function getAllGuests(from, to, search) {
  try {
    let query = supabase.from("guests").select("*", { count: "exact" });

    if (search) {
      query = query.or(
        `fullname.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    if (from !== undefined && to !== undefined) {
      query = query.range(from, to);
    }

    query = query.order("created_at", { ascending: false });

    const { data: guests, count, error } = await query;

    if (error) throw new Error(error.message);
    return { guests, count };
  } catch (err) {
    throw new Error(`Failed to retrieve guests: ${err.message}`);
  }
}

export async function getGuestByEmail(email) {
  try {
    const { data: guests, error } = await supabase
      .from("guests")
      .select("*")
      .eq("email", email);

    if (error) throw new Error(error.message);
    return guests;
  } catch (err) {
    throw new Error(`Failed to retrieve guests: ${err.message}`);
  }
}

export async function updateGuest(id, guest) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const { data, error } = await supabase.from("guests").update(guest).eq("id", id).select();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (error || !data.length) {
    console.log("supa error");
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function createGuest(guest) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const { data, error } = await supabase.from("guests").insert([guest]).select();

  if (error) {
    console.log("ERROR SUPABASE");
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteGuest(guestID) {
  const authUser = await supabase.auth.getUser();
  if (authUser?.data.user?.is_anonymous) throw new Error("Action can't be performed as an anonymous user!");

  const { data, error } = await supabase.from("guests").delete().eq("id", guestID).select();

  if (error) {
    console.log("ERROR SUPABASE");
    console.log(error);
    throw new Error(error.message);
  }
  
  if (!data || data.length === 0) {
    throw new Error("Failed to delete the guest. The guest may have associated reservations.");
  }
  
  return data;
}
