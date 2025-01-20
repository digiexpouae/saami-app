import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Stack, usePathname } from "expo-router";
import "../global.css";
import useLocationSlice from "@/hooks/useEmployee";

const RootLayout = () => {
  const path = usePathname();
  const state = useLocationSlice(state => state)


  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='(tabs)' options={{ header: () => null }} />
        <Stack.Screen name='/' options={{ header: () => null }} />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures the SafeAreaView takes up the full screen
    backgroundColor: "#fff", // Set background color if needed
  },
});

export default RootLayout;
