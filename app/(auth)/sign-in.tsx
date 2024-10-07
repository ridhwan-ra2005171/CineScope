/* eslint-disable prettier/prettier */
import { Text, View, Image, ScrollView } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import React, { useCallback } from "react";
import { useSignIn } from "@clerk/clerk-expo";


const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [form, setForm] = useState({

    email: "",
    password: "",
  })

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])


  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className={"flex-1 bg-white"}>
        <View className="relative w-full h-[220px]">
          <Image source={images.signUpCar} className={"w-full h-[220px]"} />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Welcome 👋</Text>
        </View>

        <View className="p-5">
          
          <InputField
            label={"Email"}
            placeholder={"Enter your Email"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter your Password"}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />
          <CustomButton title={"Sign In"} onPress={onSignInPress} className="mt-6" />

          {/* OAuth here */}
          <OAuth/>

          <Link href="/(auth)/sign-up" className="text-lg text-center text-general-200 mt-4">
            <Text>Don't have an account?</Text>
            <Text className="font-JakartaSemiBold text-primary-500"> Sign Up</Text>
          </Link>

        </View>

      </View>

    </ScrollView>
  );
};

export default SignIn;
