import { supabase } from "@/lib/supabase";

export function subscribeToTableChanges({
  table,
  event = "*",
  schema = "public",
  callback,
}: {
  table: string;
  event?: any;
  schema?: string;
  callback: (payload: any) => void;
}) {
  return supabase
    .channel(`${table}-${event}`)
    .on("postgres_changes", { event, schema, table }, callback)
    .subscribe();
}
