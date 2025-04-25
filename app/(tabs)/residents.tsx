import CustomInput from "@/components/CustomInput";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatTime = (time: string) => {
  const date = new Date(time);
  return `As of ${date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  })} ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
};

export default function Residents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "in" | "out">("all");
  const { residents } = useGlobalContext();

  const filteredResidents = residents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.room.includes(searchQuery);

    if (activeTab === "all") {
      return matchesSearch;
    }

    if (activeTab === "in") {
      return matchesSearch && resident.is_in;
    }

    return matchesSearch && !resident.is_in;
  });

  return (
    <SafeAreaView className="flex-1 px-4">
      <Stack.Screen options={{ title: "Residents", headerShown: false }} />
      <View className="my-4">
        <Text className="text-white text-3xl font-gbold">Residents</Text>
      </View>
      {/* Search input */}
      <CustomInput
        label=""
        placeholder="Search by name or room number..."
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        autoCapitalize="none"
      />

      {/* Tabs */}
      <View className="flex-row mt-4 justify-center">
        <Pressable
          onPress={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg mr-2 ${
            activeTab === "all" ? "bg-blue-500" : "bg-neutral-500"
          }`}
        >
          <Text className="text-white font-gsemibold">All</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("in")}
          className={`px-4 py-2 rounded-lg mr-2 ${
            activeTab === "in" ? "bg-blue-500" : "bg-neutral-500"
          }`}
        >
          <Text className="text-white font-gsemibold">In</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("out")}
          className={`px-4 py-2 rounded-lg mr-2 ${
            activeTab === "out" ? "bg-blue-500" : "bg-neutral-500"
          }`}
        >
          <Text className="text-white font-gsemibold">Out</Text>
        </Pressable>
      </View>

      {/* Resident List */}
      {/* TODO: Add component to render when empty */}
      <FlatList
        data={filteredResidents}
        renderItem={({ item }) => {
          return (
            <View className="flex-1 rounded-xl my-2 border border-white p-3 active:bg-gray-700 gap-4">
              <View className="flex-row justify-between">
                <View className="justify-center">
                  <Text className="text-white text-xl font-gbold">
                    {item.name}
                  </Text>
                  <Text className="text-gray-400 text-sm font-gregular">
                    Room Number: {item.room}
                  </Text>
                </View>
                <View className="justify-center items-end">
                  <Text
                    className={`text-xl font-gbold ${
                      item.is_in ? "text-green-500" : "text-yellow-300"
                    }`}
                  >
                    {item.is_in ? "IN" : "OUT"}
                  </Text>
                  <Text className="text-sm text-gray-400 font-gregular">
                    {formatTime(item.last_updated)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
