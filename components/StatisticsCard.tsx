import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface StatisticsCardProps {
  count: number;
  label: string;
  color: string;
  loading?: boolean;
}

export default function StatisticsCard({
  count,
  label,
  color,
  loading,
}: StatisticsCardProps) {
  return (
    <View className="flex-1 flex-col rounded-xl border border-white p-4 bg-neutral-800/50">
      {loading ? (
        <ActivityIndicator size="large" color={color} />
      ) : (
        <Text className={`text-4xl ${color} font-gbold text-center`}>
          {count}
        </Text>
      )}
      <Text className="text-base font-regular text-gray-300 text-center mt-1">
        {count === 1 ? "Resident" : "Residents"} {label}
      </Text>
    </View>
  );
}
