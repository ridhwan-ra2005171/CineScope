/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";

const layout =  () =>  {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default layout