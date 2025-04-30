import CustomInput from "@/components/CustomInput";
import { supabase } from "@/lib/supabase";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as v from "valibot";

const loginSchema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  password: v.pipe(v.string(), v.minLength(8, "Invalid password")),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);

    const result = v.safeParse(loginSchema, { email, password });

    if (!result.success) {
      const validationErrors = Object.fromEntries(
        result.issues.map((issue) => [issue.path?.[0].key, issue.message])
      );
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      Alert.alert("Login Failed", error.message);
    }
    setErrors({});

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
            autoCapitalize="none"
            error={errors.email}
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(pass) => setPassword(pass)}
            secureTextEntry={true}
            autoCapitalize="none"
            error={errors.password}
          />

          <View className="gap-6">
            <TouchableOpacity
              className="w-full h-12 bg-white rounded-lg justify-center"
              onPress={handleLogin}
              disabled={loading}
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
