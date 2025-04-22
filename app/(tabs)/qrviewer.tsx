import { useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QRCodeViewer() {
  const { user } = useAuth();
  const [loading, setIsLoading] = useState(false);
  const [qrValue, setQRValue] = useState("");

  useEffect(() => {
    if (user?.id) {
      setQRValue(user.id);
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="bg-white p-4 items-center">
        {qrValue ? (
          <QRCode
            value={qrValue}
            size={200}
            color="black"
            backgroundColor="white"
          />
        ) : (
          <ActivityIndicator size="large" color="#000" />
        )}
      </View>
    </SafeAreaView>
  );
}
