import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: { height: 60 }, 
      }}
    >
      <Tabs.Screen name='home' />
      <Tabs.Screen name='activities' />
      <Tabs.Screen name='profile' />
    </Tabs>
  );
};

export default TabLayout;
