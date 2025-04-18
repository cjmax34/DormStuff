import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Action } from "@/types";

interface ActionCardProps {
  action: Action;
  onPress: () => void;
}

export default function ActionCard({ action, onPress }: ActionCardProps) {
  return (
    <Pressable
      className="flex-1 rounded-xl border border-white p-3 active:bg-gray-700"
      onPress={onPress}
    >
      <View className="flex-col items-center">
        <FontAwesome
          size={40}
          name={action.icon as "qrcode" | "user"}
          color="white"
        />
        <Text className="text-white text-xl text-center font-gbold mt-2">
          {action.title}
        </Text>
        <Text className="text-gray-400 text-sm text-center font-gregular mt-1">
          {action.description}
        </Text>
      </View>
    </Pressable>
  );
}