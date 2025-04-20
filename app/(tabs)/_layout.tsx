import { useAuth } from "@/contexts/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={'/login'} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#808080",
        tabBarLabelStyle: { fontFamily: "Geist-SemiBold" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={26} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "QR Scanner",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={26} name="qrcode" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logbook"
        options={{
          title: "Logbook",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={26} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
