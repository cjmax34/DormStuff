import { Text, View, Pressable } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="./(tabs)" />;
}
