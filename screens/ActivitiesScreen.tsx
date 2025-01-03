import { StyleSheet, Text, Alert, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";


const isSafeRegion = (targetCoords, userCoords, radius = 300) => {
  const toRadians = (degree) => (degree * Math.PI) / 180; // Convert degrees to radians

  const earthRadius = 6371e3;
  const lat1 = toRadians(targetCoords.latitude);
  const lat2 = toRadians(userCoords.latitude);
  const deltaLat = toRadians(userCoords.latitude - targetCoords.latitude);
  const deltaLon = toRadians(userCoords.longitude - targetCoords.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance <= radius;
};
const ActivitiesScreen = () => {
  const [currentCoords, setCurrentCoords] = useState(null); // State to store coordinates
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  // Check if location services are enabled
  const checkIfLocationEnabled = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert("Location Not Enabled", "Please enable your location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: () => Location.openSettings(),
        },
      ]);
    }
    setLocationServicesEnabled(enabled);
  };

  // Get current location and coordinates
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow the app to use location services.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Open Settings",
              onPress: () => Location.openSettings(),
            },
          ]
        );
        setIsLoading(false);
        return;
      }

      // Get current position with high accuracy for geofencing
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest, // Ensure high accuracy for geofencing
      });

      if (coords) {
        setCurrentCoords(coords); // Store the coordinates for geofencing
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to fetch location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const targetCoords = {
    latitude: 28.6460000,
    longitude: -77.2304246, // Target coordinates for geofencing
  }
  const isSafe = isSafeRegion(targetCoords, currentCoords);
  console.log(isSafe);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {isLoading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : currentCoords ? (
          <View>
            <Text style={styles.coords}>
              Latitude: {currentCoords.latitude}
            </Text>
            <Text style={styles.coords}>
              Longitude: {currentCoords.longitude}
            </Text>
            <Text style={styles.coords}>
              Latitude: {isSafe ?"Safe":"You are outside the office"}
            </Text>
          </View>
        ) : (
          <Text style={styles.errorText}>Unable to fetch coordinates</Text>
        )}
      </View>
      <Text style={styles.title}>Geofencing Coordinates</Text>
    </SafeAreaView>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  coords: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
