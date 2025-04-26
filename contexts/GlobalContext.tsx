import { subscribeToTableChanges } from "@/api/supabase";
import { supabase } from "@/lib/supabase";
import {
  fetchAllResidents,
  fetchLogbook,
  getNumberOfResidentsIn,
  getNumberOfResidentsOut,
  getResidentName,
} from "@/services/resident-services";
import { LogbookEntry, Resident } from "@/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "./AuthContext";

interface GlobalContextType {
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

// TODO: Rename this context (shouldn't be called global)

const GlobalContext = createContext<GlobalContextType | null>(null);

export function GlobalProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [logbook, setLogbook] = useState<LogbookEntry[]>([]);
  const [statistics, setStatistics] = useState({
    residentsIn: 0,
    residentsOut: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResidentsAndStats();

    async function setupSubscriptions() {
      const residentsChannel = subscribeToTableChanges({
        table: "residents",
        callback: (payload) => {
          loadResidentsAndStats();
        },
      });

      if (user) {
        // Get the resident's name for comparing if the new logbook entry is for them
        const residentName = await getResidentName(user.id);

        if (residentName) {
          const logbookChannel = subscribeToTableChanges({
            table: "logbook",
            event: "INSERT",
            schema: "public",
            callback: (payload) => {
              loadResidentsAndStats();
              if (residentName === payload.new.name) {
                // If the resident's name matches the new logbook entry, show a toast
                Toast.show({
                  type: "success",
                  text1: `You are now ${payload.new.status.toUpperCase()}.`,
                  text2: `Logged by ${payload.new.logged_by}`,
                  position: "bottom",
                });
              }
            },
          });
        }
      }
    }

    setupSubscriptions();

    return () => {
      supabase.removeAllChannels();
    };
  }, [user?.id]);

  // TODO: Might refactor? Feel ko dapat hiwalay ang residents at logbook
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
        residentsOut: outCount || 0,
      });
      setLogbook(logbook);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        residents,
        logbook,
        setResidents,
        statistics,
        loading,
        loadResidents: loadResidentsAndStats,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
