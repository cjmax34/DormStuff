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
    .select('*', { count: 'exact', head: true })
    .is("is_in", true);

  if (error) {
    console.error("Error fetching residents:", error);
    throw new Error(error.message);
  }

  return count;
}

export async function getNumberOfResidentsOut() {
  const { count, error } = await supabase
    .from("residents")
    .select('*', { count: 'exact', head: true })
    .is("is_in", false);

  if (error) {
    console.error("Error fetching residents:", error);
    throw new Error(error.message);
  }

  return count;
}

export async function getResidentStatus(userId: string) {
  const { data, error } = await supabase
  .from("residents")
  .select("is_in")
  .eq("id", userId)
  .single();

  if (error) {
    console.error("Error fetching resident status:", error);
    throw new Error(error.message);
  }

  return data?.is_in;
}

export async function logResident(userId: string) {
  const currentResidentStatus = await getResidentStatus(userId);
  console.log(currentResidentStatus);

  const { error } = await supabase
   .from("residents")
   .update({ is_in: !currentResidentStatus, last_updated: new Date() })
   .eq("id", userId);

  if (error) {
    console.error("Error logging resident:", error);
    throw new Error(error.message);
  }

  return !currentResidentStatus;
}