import { Text, View, Pressable } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView className="flex-1 justify-around items-center py-20">
      <Stack.Screen options={{ title: "Lol", headerShown: true }} />
      <Text className="text-white text-4xl">
        QR Code Scanner
      </Text>
      <View className="gap-5">
        <Pressable onPress={requestPermission}>
          <Text className="text-blue-500 text-2xl">Request Permissions</Text>
        </Pressable>
        <Link href={"../scanner"} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text className={`text-blue-500 text-2xl text-center ${!isPermissionGranted ? "opacity-50" : ""}`}>
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}