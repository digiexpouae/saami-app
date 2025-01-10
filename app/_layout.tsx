import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import "../global.css";

const RootLayout = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen name="(tabs)" options={{ header: () => null }} />
        <Stack.Screen name="/" options={{ header: () => null }} />
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
