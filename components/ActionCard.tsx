import { Action } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, Text, View } from "react-native";

interface ActionCardProps {
  action: Action;
  onPress: () => void;
}

export default function ActionCard({ action, onPress }: ActionCardProps) {
  return (
    <Pressable
      className="rounded-xl border border-white p-3 active:bg-gray-700 w-[48%]"
      onPress={onPress}
    >
      <View className="flex-col justify-center items-center">
        {action.icon === "people-roof" ? (
          <FontAwesome6 size={40} name={action.icon} color="white" />
        ) : (
          <FontAwesome
            size={40}
            name={action.icon as "qrcode" | "user"}
            color="white"
          />
        )}

        <Text className="text-white text-lg font-gbold mt-2">
          {action.title}
        </Text>
        <Text className="text-gray-400 text-xs font-gregular mt-1">
          {action.description}
        </Text>
      </View>
    </Pressable>
  );
}
