import CustomInput from "@/components/CustomInput";
import { supabase } from "@/lib/supabase";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert("Login Failed", error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 justify-center p-4">
      <Stack.Screen options={{ title: "Login", headerShown: false }} />
      <View className="flex-1 justify-center px-8">
        <View className="mb-8">
          <Text className="font-gbold text-4xl text-white text-center">
            Login
          </Text>
          <Text className="font-gregular text- text-[#808080] text-center">
            Enter your email and password below to login to your account.
          </Text>
        </View>

        <View className="gap-8">
          <CustomInput
            label="Email"
            placeholder="xyz@example.com"
            value={email}
            onChangeText={(e) => setEmail(e)}
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            placeholder="******"
            value={password}
            onChangeText={(pass) => setPassword(pass)}
            secureTextEntry={true}
          />

          <View className="gap-6">
            <TouchableOpacity
              className="w-full h-12 bg-white rounded-lg justify-center"
              onPress={handleLogin}
            >
              <Text className="text-center font-gmedium">Login</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text className="text-center font-gregular text-white">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.replace("/register")}>
                <Text className="text-center font-gregular text-white underline">
                  Sign up
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
