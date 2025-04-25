import CustomInput from "@/components/CustomInput";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View, Modal } from "react-native";
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
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { residents } = useGlobalContext();

  const tabs = [
    { value: "all", label: "All" },
    { value: "in", label: "In" },
    { value: "out", label: "Out" },
  ];

  const getActiveTabLabel = () => {
    return tabs.find(tab => tab.value === activeTab)?.label || "All";
  };

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
    <SafeAreaView className="flex-1 p-4">
      <Stack.Screen options={{ title: "Residents", headerShown: false }} />
      <View className="justify-center">
        <Text className="text-white text-3xl font-gbold">Residents</Text>
      </View>
      {/* Search and Filter Section */}
      <View className="flex-row items-end mb-2">
        {/* Search input */}
        <View style={{ width: '70%' }} className="pr-2">
          <CustomInput
            label=""
            placeholder="Search by name or room number..."
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            autoCapitalize="none"
          />
        </View>
        
        {/* Filter dropdown */}
        <View style={{ width: '30%' }}>
          <Pressable 
            onPress={() => setDropdownVisible(true)}
            className="bg-neutral-700 border border-gray-300 rounded-lg px-2 py-3 flex-row justify-between items-center"
          >
            <Text className="text-white">{getActiveTabLabel()}</Text>
            <Text className="text-white">▼</Text>
          </Pressable>
        </View>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable 
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setDropdownVisible(false)}
        >
          <View className="bg-neutral-800 rounded-xl w-40 overflow-hidden">
            {tabs.map((tab) => (
              <Pressable
                key={tab.value}
                className={`px-4 py-3 border-b border-neutral-700 ${
                  activeTab === tab.value ? "bg-blue-500" : ""
                }`}
                onPress={() => {
                  setActiveTab(tab.value as "all" | "in" | "out");
                  setDropdownVisible(false);
                }}
              >
                <Text className="text-white font-gsemibold text-center">{tab.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

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
