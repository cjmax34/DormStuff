import CustomInput from "@/components/CustomInput";
import StatusCard from "@/components/ResidentCard";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatTime = (time: string) => {
  const date = new Date(time);
  return `${date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  })} ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
};

export default function Logbook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "in" | "out">("all");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { logbook } = useGlobalContext();

  const tabs = [
    { value: "all", label: "All" },
    { value: "in", label: "In" },
    { value: "out", label: "Out" },
  ];

  const getActiveTabLabel = () => {
    return tabs.find((tab) => tab.value === activeTab)?.label || "All";
  };

  const filteredLogbook = logbook.filter((resident) => {
    const matchesSearch = resident.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (activeTab === "in") {
      return matchesSearch && resident.status === "in";
    }

    if (activeTab === "out") {
      return matchesSearch && resident.status === "out";
    }

    return matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 p-4">
      <Stack.Screen options={{ title: "Logbook", headerShown: false }} />
      <View className="justify-center">
        <Text className="text-white text-3xl font-gbold">Logbook</Text>
      </View>
      {/* Search and Filter Section */}
      <View className="flex-row items-end mb-2">
        {/* Search input */}
        <View className="pr-2 w-[70%]">
          <CustomInput
            label=""
            placeholder="Search by name or room number..."
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            autoCapitalize="none"
          />
        </View>

        {/* Filter dropdown */}
        <View className="w-[30%]">
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
                <Text className="text-white font-gsemibold text-center">
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Resident List */}
      <FlatList
        contentContainerStyle={filteredLogbook.length === 0 ? { flex: 1 } : undefined}
        data={filteredLogbook}
        renderItem={({ item }) => {
          return <StatusCard item={{
            ...item,
            status: item.status as "in" | "out"
          }} formatTime={formatTime} />
        }}
        ListEmptyComponent={(
          <View className="flex-1 justify-center items-center">
            <Text className="text-white font-gbold">No entries found.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
