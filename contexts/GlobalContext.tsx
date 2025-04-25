import { subscribeToTableChanges } from "@/api/supabase";
import { supabase } from "@/lib/supabase";
import { fetchAllResidents, fetchLogbook, getNumberOfResidentsIn, getNumberOfResidentsOut } from "@/services/resident-services";
import { GlobalContextType, LogbookEntry, Resident } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
  const [logbook, setLogbook] = useState<LogbookEntry[]>([]);
  const [statistics, setStatistics] = useState({ residentsIn: 0, residentsOut: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResidentsAndStats();

    const channel = subscribeToTableChanges({
      table: "residents",
      callback: (payload) => {
        console.log("Change received in Global Context!", payload);
        loadResidentsAndStats();
      },
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadResidentsAndStats() {
    try {
      const [data, inCount, outCount, logbook] = await Promise.all([
        fetchAllResidents(),
        getNumberOfResidentsIn(),
        getNumberOfResidentsOut(),
        fetchLogbook(),
      ]);
      
      setResidents(data);
      setStatistics({
        residentsIn: inCount || 0,
        residentsOut: outCount || 0
      });
      setLogbook(logbook);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlobalContext.Provider value={{ residents, logbook, setResidents, statistics, loading, loadResidents: loadResidentsAndStats }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;