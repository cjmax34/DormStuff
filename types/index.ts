import { Href } from "expo-router";

export interface GlobalContextType {
  residents: Resident[];
  logbook: LogbookEntry[];
  setResidents: (residents: Resident[]) => void;
  statistics: {
    residentsIn: number;
    residentsOut: number;
  };
  loading: boolean;
  loadResidents: () => Promise<void>;
}

export interface Action {
  id: number;
  title: string;
  description: string;
  icon: string;
  path: Href;
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