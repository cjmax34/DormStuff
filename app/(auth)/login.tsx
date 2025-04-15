import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // TODO: Implement login logic
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView className="flex-1 justify-center p-4">
      <Stack.Screen options={{ title: "Login", headerShown: false }} />
      <View className="flex-1 justify-center px-8">
        <View className="mb-8">
          <Text className="font-gbold text-4xl text-white">Login</Text>
          <Text className="font-gregular text- text-[#808080]">Enter your email below to login to your account.</Text>
        </View>
        
        <View className="gap-8">
          <View className="gap-2">
            <Text className="text-lg font-medium dark:text-white">Email</Text>
            <TextInput 
              className="w-full h-12 px-4 border border-gray-300 rounded-lg text-white"
              placeholder="xyz@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="gray"
            />
          </View>

          <View className="gap-2">
            <Text className="text-lg font-medium dark:text-white">Password</Text>
            <TextInput 
              className="w-full h-12 px-4 border border-gray-300 rounded-lg text-white"
              placeholder=""
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholderTextColor="gray"
            />
          </View>

          <View className="gap-4">
            <TouchableOpacity className="w-full h-12 bg-white rounded-lg justify-center" onPress={handleLogin}>
              <Text className="text-center font-gmedium">Login</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity className="w-full h-12 border border-gray-300 rounded-lg justify-center" onPress={() => router.push("/(auth)/register")}>
              <Text className="text-center font-gmedium text-white">Login with Google</Text>
            </TouchableOpacity> */}
          </View>
          
        </View>

        <View>
          
        </View>
      </View>
    </SafeAreaView>
  );
}
