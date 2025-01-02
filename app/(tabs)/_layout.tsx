import { Tabs } from 'expo-router'
import React from 'react'

import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabLayout = () => {
    return (
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }} >
        <Tabs.Screen
          name='home'
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='home' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='Profile'
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='cog' color={color} />
            ),
          }}
        />
      </Tabs>
    );
}

export default TabLayout