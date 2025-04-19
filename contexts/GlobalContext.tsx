import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GlobalContextType, Resident } from "@/types";
import { fetchAllResidents } from "@/services/resident-services";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResidents();
  }, [])

  async function loadResidents () {
    try {
      const data = await fetchAllResidents();
      setResidents(data);
    } catch (error) {
      console.error(error); 
    } finally {
      setLoading(false);
    }
  }

  const statistics = {
    residentsIn: residents.filter((resident) => resident.is_in === true).length,
    residentsOut: residents.filter((resident) => resident.is_in === false).length,
  };

  return (
    <GlobalContext.Provider value={{ residents, setResidents, statistics, loading, loadResidents }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;