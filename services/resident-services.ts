import { supabase } from "@/lib/supabase";

export async function fetchAllResidents() {
  const { data, error } = await supabase
    .from("residents")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching residents:", error);
    throw new Error(error.message);
  }

  return data;
}
