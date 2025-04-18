import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, Stack, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  path: Href;
}

const features: Feature[] = [
  {
    id: 1,
    title: "QR Code Scanner",
    description: "Scan QR codes to view student information",
    icon: "qrcode",
    path: "/scanner"
  },
  {
    id: 2,
    title: "Student Logbook",
    description: "Check who is currently in and out of the dorm",
    icon: "user",
    path: "/logbook"
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "Home", headerShown: false }} />
      <View className="flex-row p-4">
        <Text className="text-white text-3xl font-gbold">Centennial RH</Text>
      </View>
      <View className="flex-row justify-center items-center m-4">
        <Image
          source={require("@/assets/images/centennialrh.png")}
          className="flex-1 h-60 rounded-xl"
        />
      </View>
      <View className="px-4">
        <Text className="text-white text-2xl font-gbold">Features</Text>
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
