import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { View, Text, StyleSheet, Linking, AppState, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Overlay } from "./Overlay";
import { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        qrLock.current = false;
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Test", headerShown: false }} />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async() => {
              await Linking.openURL(data);

            }, 500);
          }
      }}
      />
      <Overlay />
    </SafeAreaView>
  );
}
