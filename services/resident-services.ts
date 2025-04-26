import { supabase } from "@/lib/supabase";

export async function fetchAllResidents() {
  const { data, error } = await supabase
    .from("residents")
    .select("*")
    .order("room");

  if (error) {
    console.error("Error fetching residents:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getNumberOfResidentsIn() {
  const { count, error } = await supabase
    .from("residents")
    .select("*", { count: "exact", head: true })
    .eq("status", "in");

  if (error) {
    console.error("Error fetching residents:", error);
    throw new Error(error.message);
  }

  return count;
}

export async function getNumberOfResidentsOut() {
  const { count, error } = await supabase
    .from("residents")
    .select("*", { count: "exact", head: true })
    .eq("status", "out");

  if (error) {
    console.error("Error fetching residents:", error);
    throw new Error(error.message);
  }

  return count;
}

export async function fetchLogbook() {
  const { data, error } = await supabase
    .from("logbook")
    .select("*")
    .order("logged_at", { ascending: false });

  if (error) {
    console.error("Error fetching logbook:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getResidentName(userId: string) {
  const { data, error } = await supabase
    .from("residents")
    .select("name")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching resident status:", error);
    throw new Error(error.message);
  }

  return data?.name;
}

export async function getResidentStatus(userId: string) {
  const { data, error } = await supabase
    .from("residents")
    .select("status")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching resident status:", error);
    throw new Error(error.message);
  }

  return data?.status;
}

export async function insertToLogbook(userId: string, status: boolean) {
  const residentName = await getResidentName(userId);
  const { error } = await supabase
    .from("logbook")
    .insert([{ id: userId, name: residentName, logged_at: new Date() }]);

  if (error) {
    console.error("Error inserting into logbook:", error);
    throw new Error(error.message);
  }

  return;
}

export async function logResident(userId: string, loggedBy: string) {
  const [residentName, currentResidentStatus] = await Promise.all([
    getResidentName(userId),
    getResidentStatus(userId),
  ]);

  const newResidentStatus = currentResidentStatus === "in" ? "out" : "in";

  const { error } = await supabase
    .from("residents")
    .update({ status: newResidentStatus, last_updated: new Date() })
    .eq("id", userId);

  if (error) {
    console.error("Error logging resident:", error);
    throw new Error(error.message);
  }

  const { error: logbookError } = await supabase.rpc("log_resident", {
    resident_uuid: userId,
    resident_name: residentName,
    resident_new_status: newResidentStatus,
    logged_by: loggedBy,
  });

  if (logbookError) {
    console.error("Error logging resident:", logbookError);
    throw new Error(logbookError.message);
  }

  return { name: residentName, status: newResidentStatus };
}
