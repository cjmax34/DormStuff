import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { Action } from "@/types";
import StatisticsCard from "@/components/StatisticsCard";
import ActionCard from "@/components/ActionCard";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const actions: Action[] = [
  {
    id: 1,
    title: "QR Code Scanner",
    description: "Scan QR code to log in/out",
    icon: "qrcode",
    path: "/scanner",
  },
  {
    id: 2,
    title: "Student Logbook",
    description: "Check who is currently in and out of the dorm",
    icon: "user",
    path: "/logbook",
  },
];

export default function Home() {
  const { residents, statistics } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Logout failed", error.message);
    setLoading(false);
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
      <View className="flex-row mt-4 gap-3">
        <StatisticsCard
          count={statistics.residentsIn}
          label="Residents In"
          color="text-green-500"
        />
        <StatisticsCard
          count={statistics.residentsOut}
          label="Residents Out"
          color="text-yellow-300"
        />
      </View>
      <View className="flex-row mt-4 gap-3">
        {actions.map((action) => (
          <ActionCard
            key={action.id}
            action={action}
            onPress={() => router.push(action.path)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
