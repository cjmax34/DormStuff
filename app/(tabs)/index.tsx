import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 justify-around items-center py-20">
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <Text className="text-white text-4xl font-gbold">
        QR Code Scanner
      </Text>
      <View className="gap-5">
      </View>
    </SafeAreaView>
  );
}