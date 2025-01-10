import React from "react";
import { Stack } from "expo-router";
import "../global.css";
const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name='(tabs)' options={{ header: () => null }} />
      <Stack.Screen name='/' options={{ header: () => null }} />
    </Stack>
  );
};

export default RootLayout;
