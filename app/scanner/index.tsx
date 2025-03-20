import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Overlay } from "./Overlay";

export default function Home() {
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Test", headerShown: false }} />
      <CameraView 
      style={StyleSheet.absoluteFillObject} 
      facing="back"
      onBarcodeScanned={({ data }) => {
        console.log("data", data);
      }}/>
      <Overlay />
    </SafeAreaView>
  );
}
