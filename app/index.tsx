import { Text, View, Pressable } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { Redirect } from "expo-router";

export default function Index() {
  // TODO: Add login and signup functionality
  return <Redirect href="./(tabs)" />;
}
