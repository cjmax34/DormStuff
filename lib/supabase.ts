import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lxyiaubycqxuhwrbxdtt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4eWlhdWJ5Y3F4dWh3cmJ4ZHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTE5NTMsImV4cCI6MjA2MDU2Nzk1M30.XznjlBxCnbbd3Y5CXSf_BldkRtBsYTmUBRk2qPravyw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
