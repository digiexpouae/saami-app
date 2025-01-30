import {
  calculateDistanceApi,
  checkinApi,
  checkoutApi,
  getCheckinStatus,
} from "@/services/apiHandlers";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
export default function HomeScreen() {
  const [values, setValues] = useState({
    loading: false,
    status: false,
  });
  const [error, setError] = useState('')
  const  [loading, setLoading] = useState(false)

  const [refresh, setRefresh] = useState(false);
  const handleCheckinCheckout = async () => {
  setLoading(true)
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status)
        if (status !== "granted") {
          console.warn("Location permission not granted");
          setLoading(false)
          return;
    }
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords
    console.log(location.coords)
const data = { userLatitude: latitude, userLongitude:longitude };
    const calculateDistance = await calculateDistanceApi(data)
    if (calculateDistance === false) {
        setError(
          "Please Be Present Inside Office First Before Trying To Checkin/Checkout"
      );
      setLoading(false)

      setTimeout(() => {

        setError("")
      }, 1000*10)
      return
    }

    const checkin_status = await getCheckinStatus();
    if (checkin_status) {
      checkoutApi();
    } else {
      checkinApi();
    }
    setLoading(false)
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getStatus = async () => {
      setValues((prev) => ({ ...prev, loading: true }));
      const res = await getCheckinStatus();
      setValues((prev) => ({ ...prev, loading: false, status: res }));
    };

    getStatus();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Button to check in or out */}
        <Text style={styles.error}>{error}</Text>
        { loading === true ? <Text>Loading ...</Text> :
        <Button
          mode='contained'
          style={values.status ? styles.checkout_button : styles.checkin_button}
          onPress={handleCheckinCheckout}
        >
          {values.status ? "Check Out" : "Check In"}
        </Button>}
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
    color: "#36454F",
    fontWeight: "bold",
  },
  checkin_button: {
    backgroundColor: "green",
  },
  checkout_button: {
    backgroundColor: "red",
  },
  error: {
    color: "red",
  },
});
