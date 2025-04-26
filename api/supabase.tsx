import { supabase } from "@/lib/supabase";

interface SubscriptionProps {
  table: string;
  event?: any;
  schema?: string;
  filter?: string;
  callback: (payload: any) => void;
}

export function subscribeToTableChanges({
  table,
  event = "*",
  schema = "public",
  filter,
  callback,
}: SubscriptionProps) {
  return supabase
    .channel(`${table}-${event}`)
    .on("postgres_changes", { event, schema, table, filter }, callback)
    .subscribe();
}
