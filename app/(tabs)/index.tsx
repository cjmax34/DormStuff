import ActionCard from "@/components/ActionCard";
import StatisticsCard from "@/components/StatisticsCard";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { supabase } from "@/lib/supabase";
import { Action } from "@/types";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const actions: Action[] = [
  {
    id: 1,
    title: "Scanner",
    description: "Scan QR code to log in/out",
    icon: "qrcode",
    path: "/scanner",
  },
  {
    id: 2,
    title: "Viewer",
    description: "View your QR code here",
    icon: "qrcode",
    path: "/qrviewer",
  },
  {
    id: 3,
    title: "Residents",
    description: "Check the list of residents",
    icon: "people-roof",
    path: "/residents",
  },
];

export default function Home() {
  const { statistics, loading: statsLoading } = useGlobalContext();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLogoutLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Logout failed", error.message);
    setLogoutLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-3xl font-gbold">Centennial RH</Text>
        <Pressable
          onPress={handleLogout}
          className="px-4 py-2 rounded-lg bg-neutral-700 active:bg-neutral-900 items-center gap-2"
        >
          <Text className="text-white font-gmedium">Log out</Text>
        </Pressable>
      </View>
      <View className="flex-row justify-center items-center mt-6">
        <Image
          source={require("@/assets/images/centennialrh.png")}
          className="flex-1 h-60 rounded-xl"
        />
      </View>
      <View className="mt-6">
        <Text className="text-white text-xl font-gbold">Statistics</Text>
        <View className="flex-row mt-4 gap-3">
          <StatisticsCard
            count={statistics.residentsIn}
            label="In"
            color="text-green-500"
            loading={statsLoading}
          />
          <StatisticsCard
            count={statistics.residentsOut}
            label="Out"
            color="text-yellow-300"
            loading={statsLoading}
          />
        </View>
      </View>
      <View className="mt-6">
        <Text className="text-white text-xl font-gbold">Quick Actions</Text>
        <View className="flex-row mt-4 gap-3">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              onPress={() => router.push(action.path)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
