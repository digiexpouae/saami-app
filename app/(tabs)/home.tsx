import {
  checkinApi,
  checkoutApi,
  getCheckinStatus,
} from "@/services/apiHandlers";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
export default function HomeScreen() {
  const [values, setValues] = useState({
    loading: false,
    status: false,
  });

  const [refresh, setRefresh] = useState(false);
  const handleCheckinCheckout = async () => {
    const status = await getCheckinStatus();
    if (status) {
      checkoutApi();
    } else {
      checkinApi();
    }
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
        <Button
          mode='contained'
          style={values.status ? styles.checkout_button : styles.checkin_button}
          onPress={handleCheckinCheckout}
        >
          {values.status ? "Check Out" : "Check In"}
        </Button>
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
