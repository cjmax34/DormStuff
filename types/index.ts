import { Href } from "expo-router";

export interface Action {
  id: number;
  title: string;
  description: string;
  icon: string;
  path?: Href;
}

//  Resident
export interface Resident {
  id: string;
  name: string;
  email: string;
  room: string;
  status: string;
  last_updated: string;
  created_at: string;
}

// Logbook
export interface LogbookEntry {
  id: string;
  name: string;
  status: string;
  logged_at: string;
}
