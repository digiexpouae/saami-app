import {
  calculateDistanceApi,
  checkinApi,
  checkoutApi,
  getCheckinStatus,
  toggleCheckinCheckout,
} from "@/services/apiHandlers";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { FontAwesome } from "react-native-vector-icons";
export default function HomeScreen() {
  const [values, setValues] = useState({
    loading: false,
    status: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);

  //  handler
  const handleCheckinCheckout = async () => {
    setLoading(true);

    try {
      // 1️⃣ Check Location Permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        setLoading(false);
        return;
      }

      console.log("Status:", status);

      // 2️⃣ Get Last Known Location (Fast)
      let location = await Location.getLastKnownPositionAsync({});

      console.log(
        "Location:",
        location.coords.latitude,
        location.coords.longitude
      );

      // 3️⃣ If No Last Known Location, Fetch Fresh GPS Data
      if (!location) {
        console.log("Fetching fresh GPS location...");
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // High accuracy for better results
        });
      }

      if (!location) {
        console.warn("Unable to retrieve location");
        setLoading(false);
        return;
      }

      const { latitude, longitude } = location.coords;
      console.log("Location:", latitude, longitude);

      const data = { userLatitude: latitude, userLongitude: longitude };

      // 4️⃣ Call API with Location Data
      const result = await toggleCheckinCheckout(data);

      console.log("Check-in/out result:", result);
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      // 5️⃣ Always Stop Loading (Even on Error)
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  // const handleCheckinCheckout = async () => {
  // setLoading(true)
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         console.warn("Location permission not granted");
  //         setLoading(false)
  //         return;
  //   }
  //   console.log("Status" , status)
  //   const location = await Location.getCurrentPositionAsync({});
  //   const { latitude, longitude } = location.coords
  //   console.log(location.coords)
  //   const data = { userLatitude: latitude, userLongitude: longitude };

  // const result =  await toggleCheckinCheckout(data)

  //   console.log(result)
  //   setLoading(false)
  //   setRefresh(!refresh);
  // };

  useEffect(() => {
    const getStatus = async () => {
      const res = await getCheckinStatus();
      setValues((prev) => ({ ...prev, status: res }));

      console.log(res, "Checkin status");
    };

    getStatus();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Button to check in or out */}
        <Text style={styles.error}>{error}</Text>
        {loading === true ? (
          <Text>Loading ...</Text>
        ) : (
          <>
            <View
              style={
                values.status ? styles.checkout_button : styles.checkin_button
              }
            >
              <TouchableOpacity onPress={handleCheckinCheckout}>
                <FontAwesome name='hand-pointer-o' size={100} color='white' />
                <Text style={styles.title}>{values.status ? "Clock Out" :"Clock In"} </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    width: "90%",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    borderColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  checkin_button: {
    backgroundColor: "#18364a",
    width: 170,
    height: 170,
    borderRadius: 100,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  checkout_button: {
    backgroundColor: "#e64834",
    width: 170,
    height: 170,
    borderRadius: 100,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});
