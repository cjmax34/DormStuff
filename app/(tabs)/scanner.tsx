import { logResident } from "@/services/resident-services";
import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Overlay } from "../../components/Overlay";

export default function Scanner() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQrScan = async ({ data } : { data: string }) => {
    if (data && !isProcessing) {
      setIsProcessing(true);
      try {
        const res = await logResident(data);
        const residentName = res.name;
        const newResidentStatus = res.status;
        setTimeout(() => {
          setIsProcessing(false);
        }, 1000);
        ToastAndroid.showWithGravity(
          `Successfully logged ${residentName} as ${newResidentStatus === true? "IN": "OUT"}`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        )
      } catch (error) {
        setIsProcessing(false);
      }
    }
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "QR Scanner", headerShown: false }} />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        facing="back"
        onBarcodeScanned={isProcessing ? undefined : handleQrScan}
      />
      <Overlay />
      {isProcessing && (
        <View style={StyleSheet.absoluteFillObject} className="justify-center items-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </SafeAreaView>
  );
}
