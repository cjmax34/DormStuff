import { View, Text } from "react-native";
import React from "react";

interface StatisticsCardProps {
  count: number;
  label: string;
  color: string;
}

export default function StatisticsCard({
  count,
  label,
  color,
}: StatisticsCardProps) {
  return (
    <View className="flex-1 flex-col rounded-xl border border-white p-4 bg-neutral-800/50">
      <Text className={`text-4xl ${color} font-gbold text-center`}>
        {count}
      </Text>
      <Text className="text-base font-regular text-gray-300 text-center mt-1">
        {label}
      </Text>
    </View>
  );
}
