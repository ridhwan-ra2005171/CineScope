/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";

const layout =  () =>  {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
 

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default layout