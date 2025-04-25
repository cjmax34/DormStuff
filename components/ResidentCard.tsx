import { Text, View } from "react-native";

interface ResidentCardProps {
  item: {
    name: string;
    status: "in" | "out";
    room?: string;
    last_updated?: string;
    logged_at?: string;
  };
  formatTime: (time: string) => string;
}

export default function StatusCard({ item, formatTime }: ResidentCardProps) {
  const timestamp = item.logged_at || item.last_updated;
  const isLogbook = Boolean(item.logged_at);

  return (
    <View className="rounded-xl my-2 border border-white p-3 active:bg-gray-700 gap-4">
      <View className="flex-row justify-between">
        <View className="justify-center">
          <Text className="text-white text-xl font-gbold">
            {item.name}
          </Text>
          {!isLogbook && item.room && (
            <Text className="text-gray-400 text-sm font-gregular">
              Room Number: {item.room}
            </Text>
          )}
        </View>
        <View className="justify-center items-end">
          <Text
            className={`text-xl font-gbold ${
              item.status === "in"
                ? "text-green-500"
                : "text-yellow-300"
            }`}
          >
            {item.status === "in" ? "IN" : "OUT"}
          </Text>
          <Text className="text-sm text-gray-400 font-gregular">
            {`${formatTime(timestamp!)}`}
          </Text>
        </View>
      </View>
    </View>
  );
}