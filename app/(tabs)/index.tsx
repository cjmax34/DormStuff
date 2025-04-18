import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGlobalContext } from "@/hooks/useGlobalProvider";
import { Action } from "@/types";

const features: Action[] = [
  {
    id: 1,
    title: "QR Code Scanner",
    description: "Scan QR codes to view student information",
    icon: "qrcode",
    path: "/scanner",
  },
  {
    id: 2,
    title: "Student Logbook",
    description: "Check who is currently in and out of the dorm",
    icon: "user",
    path: "/logbook",
  },
];

export default function Home() {
  const { residents } = useGlobalContext();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 p-4">
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <View className="flex-row">
        <Text className="text-white text-3xl font-gbold">Centennial RH</Text>
      </View>
      <View className="flex-row justify-center items-center mt-6">
        <Image
          source={require("@/assets/images/centennialrh.png")}
          className="flex-1 h-60 rounded-xl"
        />
      </View>
      <View className="flex-row mt-4 gap-3">
        <View className="flex-1 flex-col rounded-xl border border-white p-4 bg-neutral-800/50">
          <Text className="text-lg font-regular text-gray-300 text-center">
            # of residents currently in
          </Text>
          <Text className="text-4xl text-green-500 font-gbold text-center mt-2">
            {residents.filter((resident) => resident.isIn === true).length}
          </Text>
        </View>
        <View className="flex-1 flex-col rounded-xl border border-white p-4 bg-neutral-800/50">
          <Text className="text-lg font-regular text-gray-300 text-center">
            # of residents currently out
          </Text>
          <Text className="text-4xl text-yellow-300 font-gbold text-center mt-2">
            {residents.filter((resident) => resident.isIn === false).length}
          </Text>
        </View>
      </View>
      <View className="mt-4">
        <View className="">
          <FlatList
            data={features}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ gap: 10 }}
            renderItem={({ item }) => {
              return (
                <Pressable
                  className="flex-1 rounded-xl my-4 border border-white p-3 active:bg-gray-700 gap-4"
                  onPress={() => router.push(item.path)}
                >
                  <View className="flex-col items-center">
                    <FontAwesome
                      size={40}
                      name={item.icon as "qrcode" | "user"}
                      color="white"
                    />
                    <Text className="text-white text-xl text-center font-gbold">
                      {item.title}
                    </Text>
                    <Text className="text-gray-400 text-sm text-center font-gregular">
                      {item.description}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
