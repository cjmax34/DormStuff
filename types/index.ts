import { Href } from "expo-router";

//  Resident
export interface Resident {
  id: string;
  name: string;
  email: string;
  room: string;
  is_in: boolean;
  last_updated: string;
  created_at: string;
}

export interface GlobalContextType {
  residents: Resident[];
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