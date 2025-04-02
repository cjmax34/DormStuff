import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Stack.Screen options={{ title: "Settings", headerShown: false }} />
      <Text className="text-white">Tab [Home|Settings]</Text>
    </SafeAreaView>
  );
}
