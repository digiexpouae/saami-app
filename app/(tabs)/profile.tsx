import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import useLocationSlice from "@/hooks/useEmployee"; // Assuming this manages user state

const Profile = () => {
  const router = useRouter();
  const { user, isLoggedIn, setUser } = useLocationSlice((state) => state);

  // Ensure token is still valid on app load
  useEffect(() => {
    const checkUserToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setUser(null);
        router.replace("/Login"); // Use replace to prevent navigation stacking
      }
    };
    checkUserToken();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    setUser(null);
    router.replace("/Login");
  };

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      router.replace("/Login");
    }
  }, [isLoggedIn, user]);

  return (
    <ScrollView style={styles.container}>
      {user ? (
        <>
          {/* Profile Banner */}
          <View style={styles.profileBanner}>
            <Text style={styles.bannerText}>{user?.username || "Guest"}</Text>
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
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  profileBanner: {
    backgroundColor: "#18364a",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
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
    backgroundColor: "#e64834",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Profile;
