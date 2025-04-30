import { useAuth } from "@/contexts/AuthContext";
import { useCameraPermissions } from "expo-camera";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user, loading, isAdmin } = useAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  if (!isPermissionGranted) {
    const handlePermission = async () => {
      await requestPermission();
    };
    handlePermission();
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }
  
  if (isAdmin) {
    return <Redirect href="./(admin)" />;
  }

  if (!isAdmin) {
    return <Redirect href="./(user)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
