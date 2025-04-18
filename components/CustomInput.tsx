import { Text, TextInput, TextInputProps, View } from "react-native";

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function CustomInput({ label, error, ...props }: CustomInputProps) {
  return (
    <View className="gap-2">
      <Text className="text-lg font-medium text-white">{label}</Text>
      <TextInput
        className="w-full h-12 px-4 border border-gray-300 rounded-lg text-white"
        placeholderTextColor="gray"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm font-gregular">{error}</Text>
      )}
    </View>
  );
}