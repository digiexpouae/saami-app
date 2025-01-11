import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useColorScheme } from "react-native";

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 60, paddingBottom: 5, backgroundColor: colorScheme === "dark" ? "#222" : "#fff" },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "activities") {
            iconName = "list";
          } else if (route.name === "profile") {
            iconName = "person";
          } else if (route.name === "attendance") { // Remove extra space here
            iconName = "clipboard";  // Change to clipboard or any other icon you prefer
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 8,
        },
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="activities" options={{ tabBarLabel: "Activities" }} />
      <Tabs.Screen name="attendance" options={{ tabBarLabel: "Attendance" }} />  
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
      
    </Tabs>
  );
};

export default TabLayout;
