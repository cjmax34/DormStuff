import { useAuth } from "@/contexts/AuthContext";
import { getResidentName, logResident } from "@/services/resident-services";
import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Overlay } from "../../components/Overlay";

export default function Scanner() {
  // TODO: Only admin/guards should be able to access this page
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQrScan = async ({ data }: { data: string }) => {
    if (data && !isProcessing) {
      setIsProcessing(true);
      try {
        const loggedBy = await getResidentName(user!.id);
        const res = await logResident(data, loggedBy);
        const residentName = res.name;
        const newResidentStatus = res.status;
        setTimeout(() => {
          setIsProcessing(false);
        }, 1000);
        Toast.show({
          type: "success",
          text1: "SUCCESSFULLY LOGGED",
          text2: `${residentName} is now ${newResidentStatus.toUpperCase()}.`,
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "ERROR LOGGING",
          text2:
            "Something went wrong while logging the resident. Please try again.",
        });
        setIsProcessing(false);
      }
    }
  };

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
        <View
          style={StyleSheet.absoluteFillObject}
          className="justify-center items-center"
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </SafeAreaView>
  );
}
