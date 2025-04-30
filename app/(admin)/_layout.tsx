import { useAuth } from "@/contexts/AuthContext";
import { FontAwesome6 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Redirect href={"/login"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"./(user)"} />;
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
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "QR Scanner",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="qrcode" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="residents"
        options={{
          title: "Residents",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={24} name="people-roof" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logbook"
        options={{
          title: "Logbook",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="address-book-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
