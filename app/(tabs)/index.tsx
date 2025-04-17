import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <View className="flex-row p-4">
        <Text className="text-white text-3xl font-gbold">
          Centennial RH
        </Text>
      </View>
      <View className="flex-row justify-center items-center m-4">
        <Image source={require("@/assets/images/centennialrh.png")} className="flex-1 h-60 rounded-xl"/>
      </View>

    </SafeAreaView>
  );
}