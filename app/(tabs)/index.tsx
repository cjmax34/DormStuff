import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useGlobalContext } from "@/hooks/useGlobalProvider";
import { Action } from "@/types";
import StatisticsCard from "@/components/StatisticsCard";
import ActionCard from "@/components/ActionCard";

const actions: Action[] = [
  {
    id: 1,
    title: "QR Code Scanner",
    description: "Scan QR codes to view student information",
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
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 p-4">
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <View className="flex-row">
        <Text className="text-white text-3xl font-gbold">Centennial RH</Text>
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
