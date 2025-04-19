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
      is_in: true, // Default value
      last_updated: new Date(),
      created_at: new Date(),
    },
  ]);

  if (error) {
    console.error("Profile insert error:", error);
    throw new Error(error.message);
  }
}
