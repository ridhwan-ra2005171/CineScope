/* eslint-disable prettier/prettier */
import { Text, View, Image, ScrollView, Alert } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",
  })

  //state initially default
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  })

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
        ...verification,
        state: "pending",
      })
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      Alert.alert("Error", err.errors[0].longMessage) //checks if password is too short
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return; //return nothing
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === "complete") {
        //FETCH DB
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });//api route will correspond to the function in user+api.tsx


        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({ ...verification, state: "success" })
      } else {
        setVerification({ ...verification, state: "failed", error: "Verification Failed" })
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({ ...verification, state: "failed", error: err.errors[0].longMessage })

      console.error(JSON.stringify(err, null, 2))
    }
  }


  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className={"flex-1 bg-white"}>
        <View className="relative w-full h-[170px]">
          <Image source={images.signUpCar} className={"w-full h-[170px]"} />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Create an Account</Text>
        </View>

        <View className="p-5">

          <InputField
            label={"Name"}
            placeholder={"Enter your name"}
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
          <CustomButton title={"Sign Up"} onPress={onSignUpPress} className="mt-6" />

          {/* OAuth here */}
          <OAuth />

          <Link href="/(auth)/sign-in" className="text-lg text-center text-general-200 mt-4">
            <Text>Already have an account?</Text>
            <Text className="font-JakartaSemiBold text-primary-500"> Sign In</Text>
          </Link>

        </View>

        {/* verification modal Pending */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
            Verification
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta mb-5">
              Verification code sent to {form.email}
            </Text>

            <InputField
              label={"Verification Code"}
              placeholder={"Enter your Verification Code"}
              keyboardType="numeric"
              value={verification.code}
              onChangeText={(value) => setVerification({ ...verification, code: value })}
            />
            {verification.error && (
              <Text className="text-red-500 font-Jakarta text-sm">{verification.error}</Text>
              )}

            <CustomButton
              title={"Continue"}
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        {/* verification modal success */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl text-center text-black font-JakartaBold">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              Account has been Successfully verified!
            </Text>

            <CustomButton
              title={"Continue"}
              onPress={(() => {
                setShowSuccessModal(false);//close the continue modal
                router.push("/(root)/(tabs)/home")
              })}
              className="mt-6"
            />
          </View>
        </ReactNativeModal>
      </View>

    </ScrollView>
  );
};

export default SignUp;
