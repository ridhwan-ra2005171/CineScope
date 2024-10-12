/* eslint-disable prettier/prettier */

import { icons } from "@/constants"
import { Tabs } from "expo-router"
import { Image, ImageSourcePropType, View } from "react-native"

const TabIcon = ({ source, focused }: { source: ImageSourcePropType, focused: boolean }) => (
  <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
    <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}> 
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-6 h-6"
      />
    </View>
  </View>
)

const layout = () => (
  <Tabs 
  initialRouteName="index" 
  screenOptions={{ 
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "gray",
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: "#333333",//gray
      borderRadius: 50,
      paddingBottom:0,
      overflow: "hidden",
      marginHorizontal:20,
      marginBottom:20,
      height: 75,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      position: "absolute",//so it always appear at top of other content
    }
  }}
  >

    {/* to modify the bottom bar */}
    <Tabs.Screen
      name="home"
      options={
        {
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} source={icons.home} />

          )
        }
      }>
    </Tabs.Screen>

    <Tabs.Screen
      name="rides"
      options={
        {
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} source={icons.list} />

          )
        }
      }>
    </Tabs.Screen>

    <Tabs.Screen
      name="chat"
      options={
        {
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} source={icons.chat} />

          )
        }
      }>
    </Tabs.Screen>

    <Tabs.Screen
      name="profile"
      options={
        {
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} source={icons.home} />

          )
        }
      }>
    </Tabs.Screen>

  </Tabs>
)

export default layout