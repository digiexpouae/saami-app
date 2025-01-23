import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";
import useLocationSlice from "@/hooks/useEmployee"; // Assuming this is how you import the state

const Profile = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useLocationSlice((state) => state);
  console.log("user info " , user)

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("userId");
    router.push("/Login");
  };

  return (
    <ScrollView style={styles.container}>
      {user?._id ? (
        <>
          {/* Profile Banner */}
          <View style={styles.profileBanner}>
            <Text style={styles.bannerText}>{user?.username}</Text>
            <Text style={styles.bannerSubText}>{user?.role || "Engineer"}</Text>
          </View>

          {/* User Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>User Information</Text>
            <Text style={styles.infoText}>ID: {user?._id || "N/A"}</Text>
            <Text style={styles.infoText}>
              Name: {user?.username || "John Doe"}
            </Text>
            <Text style={styles.infoText}>
              Email: {user?.email || "example@example.com"}
            </Text>
            <Text style={styles.infoText}>
              Role: {user?.role || "Engineer"}
            </Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
          <Redirect href={'/Login'} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Soft background color
    padding: 16,
  },
  profileBanner: {
    backgroundColor: "#4CAF50", // Vibrant green background for the profile section
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5, // Adds shadow for depth
  },
  bannerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: "#E53E3E", // Bright red logout button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  noUserText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 30,
  },
});

export default Profile;
