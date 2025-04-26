import { subscribeToTableChanges } from "@/api/supabase";
import { supabase } from "@/lib/supabase";
import {
  fetchAllResidents,
  fetchLogbook,
  getNumberOfResidentsIn,
  getNumberOfResidentsOut,
  getResidentName,
} from "@/services/resident-services";
import { GlobalContextType, LogbookEntry, Resident } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "./AuthContext";

// TODO: Rename this context (shouldn't be called global)

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
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
          // console.log("Change received in Global Context!", payload);
          loadResidentsAndStats();
        },
      });

      if (user) {
        // Get the resident's name for comparing if the new logbook entry is for them
        const residentName = await getResidentName(user.id);

        if (residentName) {
          // console.log(residentName);
          const logbookChannel = subscribeToTableChanges({
            table: "logbook",
            event: "INSERT",
            schema: "public",
            callback: (payload) => {
              // console.log("Change received!", payload);
              loadResidentsAndStats();
              if (residentName === payload.new.name) {
                // If the resident's name matches the new logbook entry, show a toast
                console.log("Show toast");
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
};

export default GlobalProvider;
