import { createContext, ReactNode, useContext, useState } from "react";
import { GlobalContextType, Resident } from "@/types";

const sampleResidents: Resident[] = [
  {
    id: 1,
    name: "John Doe",
    room: "101",
    isIn: true,
    time: "2021-01-01 12:00:00",
  },
  {
    id: 2,
    name: "Jane Doe",
    room: "102",
    isIn: false,
    time: "2021-01-01 12:00:00",
  },
  {
    id: 3,
    name: "Bob Smith",
    room: "103",
    isIn: true,
    time: "2021-01-01 14:30:00",
  },
  {
    id: 4,
    name: "Alice Johnson",
    room: "104",
    isIn: false,
    time: "2021-01-01 15:45:00",
  },
  {
    id: 5,
    name: "Mike Wilson",
    room: "201",
    isIn: true,
    time: "2021-01-01 16:20:00",
  },
  {
    id: 6,
    name: "Sarah Davis",
    room: "202",
    isIn: false,
    time: "2021-01-01 17:10:00",
  },
  {
    id: 7,
    name: "Tom Brown",
    room: "203",
    isIn: true,
    time: "2021-01-01 18:00:00",
  },
  {
    id: 8,
    name: "Emily White",
    room: "204",
    isIn: false,
    time: "2021-01-01 19:15:00",
  },
];

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};


const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [residents, setResidents] = useState<Resident[]>(sampleResidents);

  return (
    <GlobalContext.Provider value={{ residents, setResidents }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;