import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useState } from "react";

interface Resident {
  id: number;
  name: string;
  room: string;
  isIn: boolean;
  time: string;
}

const formatTime = (time: string) => {
  const date = new Date(time);
  return `As of ${date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  })} ${date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })}`;
}

const sampleResidents: Resident[] = [
  {
    id: 1,
    name: "John Doe",
    room: "101",
    isIn: true,
    time: "2021-01-01 12:00:00",
  },
  {
    id: 2,
    name: "Jane Doe",
    room: "102",
    isIn: false,
    time: "2021-01-01 12:00:00",
  },
  {
    id: 3,
    name: "Bob Smith",
    room: "103",
    isIn: true,
    time: "2021-01-01 14:30:00",
  },
  {
    id: 4,
    name: "Alice Johnson",
    room: "104",
    isIn: false,
    time: "2021-01-01 15:45:00",
  },
  {
    id: 5,
    name: "Mike Wilson",
    room: "201",
    isIn: true,
    time: "2021-01-01 16:20:00",
  },
  {
    id: 6,
    name: "Sarah Davis",
    room: "202",
    isIn: false,
    time: "2021-01-01 17:10:00",
  },
  {
    id: 7,
    name: "Tom Brown",
    room: "203",
    isIn: true,
    time: "2021-01-01 18:00:00",
  },
  {
    id: 8,
    name: "Emily White",
    room: "204",
    isIn: false,
    time: "2021-01-01 19:15:00",
  },
];

export default function Logbook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "in" | "out">("all");

  const filteredResidents = sampleResidents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.room.includes(searchQuery);

    if (activeTab === "all") {
      return matchesSearch;
    }

    if (activeTab === "in") {
      return matchesSearch && resident.isIn;
    }

    return matchesSearch && !resident.isIn;
  });

  return (
    <SafeAreaView className="flex-1 px-4">
      <Stack.Screen options={{ title: "Logbook", headerShown: false }} />
      <View className="my-4">
        <Text className="text-white text-3xl font-gbold">Logbook</Text>
      </View>
      {/* Search input */}
      <View className="">
        <TextInput
          className="w-full h-12 px-4 border border-gray-300 rounded-lg text-white"
          placeholder="Search by name or room number..."
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
          placeholderTextColor="gray"
        />
      </View>

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
                  <Text className={`text-xl text-white font-gbold ${item.isIn ? "text-green-500": "text-yellow-300"}`}>
                    {item.isIn ? "IN" : "OUT"}
                  </Text>
                  <Text className="text-sm text-gray-400 font-gregular">{formatTime(item.time)}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
