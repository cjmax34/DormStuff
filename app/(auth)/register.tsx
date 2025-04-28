import CustomInput from "@/components/CustomInput";
import { supabase } from "@/lib/supabase";
import { createResidentProfile } from "@/services/account-services";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as v from "valibot";

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

const registerSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Name must not be empty.")),
  email: v.pipe(
    v.string(),
    v.email("Invalid email"),
    v.endsWith("@up.edu.ph", "Please use your UP email."),
    v.nonEmpty("Email must not be empty.")
  ),
  roomNum: v.pipe(
    v.string(),
    v.length(3, "Invalid room number"),
    v.nonEmpty("Room number must not be empty."),
  ),
  password: v.pipe(
    v.string(),
    v.regex(passRegex, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    v.minLength(8, "Password must be at least 8 characters long."),
    v.nonEmpty("Password must not be empty."),
  ),
});

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    roomNum?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister() {
    setLoading(true);

    const result = v.safeParse(registerSchema, { name, email, roomNum, password });

    if (!result.success) {
      const validationErrors = Object.fromEntries(
        result.issues.map((issue) => [issue.path?.[0].key, issue.message])
      );
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Registration Failed", error.message);
      setPassword("");
      setLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      Alert.alert("Failed to get user!");
      setLoading(false);
      return;
    }

    try {
      await createResidentProfile(user.id, name, email, roomNum);
      Alert.alert("Sign-up successful!");
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert(errorMessage);
    }

    setLoading(false);
  }

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
            autoCapitalize="words"
            error={errors.name}
          />

          <CustomInput
            label="Email"
            placeholder="xyz@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <CustomInput
            label="Room Number"
            placeholder="E.g. 123"
            value={roomNum}
            onChangeText={setRoomNum}
            autoCapitalize="none"
            error={errors.roomNum}
          />

          <CustomInput
            label="Password"
            placeholder="Minimum of 8 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            error={errors.password}
          />

          <View className="gap-6">
            <TouchableOpacity
              className="w-full h-12 bg-white rounded-lg justify-center"
              onPress={handleRegister}
              disabled={loading}
            >
              <Text className="text-center font-gmedium">Register</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center">
              <Text className="text-center font-gregular text-white">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
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
