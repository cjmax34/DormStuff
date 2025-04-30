import { supabase } from "@/lib/supabase";

export async function createResidentProfile(
  userId: string,
  name: string,
  email: string,
  roomNum: string
) {
  const { error } = await supabase.from("residents").upsert([
    {
      id: userId,
      name: name,
      email: email,
      room: roomNum,
      status: "in", // Default value
      role: "resident", // Default value
      last_updated: new Date(),
      created_at: new Date(),
    },
  ]);

  if (error) {
    console.error("Profile insert error:", error);
    throw new Error(error.message);
  }
}

export async function getUserRole(userId: string) {
  const { data, error } = await supabase
    .from("residents")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user role:", error);
    return null;
  }

  return data.role;
}