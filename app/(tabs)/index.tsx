import { Text, View, Pressable } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView className="flex-1 justify-around items-center py-20">
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <Text className="text-white text-4xl font-pbold">
        QR Code Scanner
      </Text>
      <View className="gap-5">
        <Pressable onPress={requestPermission}>
          <Text className="text-blue-500 text-2xl font-sregular">Request Permissions</Text>
        </Pressable>
        <Link href={"../scanner"} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text className={`text-blue-500 text-2xl text-center font-sregular ${!isPermissionGranted ? "opacity-50" : ""}`}>
              Scan QR Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}