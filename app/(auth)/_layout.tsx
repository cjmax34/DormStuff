import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/(tabs)'} />
  }
  
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ title: "Login", headerShown: false }} />
        <Stack.Screen name="register" options={{ title: "Register", headerShown: false }} />
      </Stack>
    </>
    
  );
}
