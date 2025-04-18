import { Href } from "expo-router";

//  Resident
export interface Resident {
  id: number;
  name: string;
  room: string;
  isIn: boolean;
  time: string;
}

//  For Global Context purposes
export interface GlobalContextType {
  residents: Resident[];
  setResidents: React.Dispatch<React.SetStateAction<Resident[]>>;
}

export interface Action {
  id: number;
  title: string;
  description: string;
  icon: string;
  path: Href;
}