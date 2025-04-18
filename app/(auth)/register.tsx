import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";
import CustomInput from "@/components/CustomInput";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    // TODO: Implement register logic
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-4">
      <Stack.Screen options={{ title: "Register", headerShown: false }} />
      <View className="flex-1 justify-center px-8">
        <View className="mb-8">
          <Text className="font-gbold text-4xl text-white text-center">
            Register
          </Text>
          <Text className="font-gregular text- text-[#808080] text-center">
            Enter your name, email, and password below to create an account.
          </Text>
        </View>

        <View className="gap-8">
          <CustomInput
            label="Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
          />

          <CustomInput
            label="Email"
            placeholder="xyz@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            placeholder="******"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <View className="gap-6">
            <TouchableOpacity
              className="w-full h-12 bg-white rounded-lg justify-center"
              onPress={handleRegister}
            >
              <Text className="text-center font-gmedium">Register</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text className="text-center font-gregular text-white">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text className="text-center font-gregular text-white underline">
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View></View>
      </View>
    </SafeAreaView>
  );
}
