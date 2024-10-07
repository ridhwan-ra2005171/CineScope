/* eslint-disable prettier/prettier */
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {

  //if signed it redirect to home, else to the onboard screen
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />
  }

  return (
    <Redirect href="/(auth)/welcome" />
    // <SafeAreaView>
    //   <Text>Home</Text>
    // </SafeAreaView>
  );
};

export default Home;
