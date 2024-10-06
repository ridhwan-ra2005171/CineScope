import {  View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';  


export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold">Uber Clone</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


