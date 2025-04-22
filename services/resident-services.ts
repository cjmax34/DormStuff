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

// export async function getDetailsForQRCode(userId: string) {
//   const { data, error } = await supabase
//     .from("residents")
//     .select("name, email, room")
//     .eq("id", userId);

//   if (error) {
//     console.error("Error fetching resident details:", error);
//     throw new Error(error.message);
//   }

//   return data;
// }
