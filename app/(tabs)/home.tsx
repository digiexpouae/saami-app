import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import useLocationSlice from "@/hooks/useEmployee"; // Import the Zustand store
import { checkinApi, checkoutApi } from "@/services/apiHandlers"; // Import API functions

export default function HomeScreen() {
  const { isInsideOffice, isCheckedIn, setCheckIn } = useLocationSlice((state) => state); // Get state from Zustand store


  const handleCheckInOut = async () => {
    if (!isInsideOffice) {
      alert("Please enter the office to check in!");
      return;
    }

    if (!isCheckedIn) {
   
      await checkinApi();
      setCheckIn(true); 
    } else {
      
      await checkoutApi();
      setCheckIn(false); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Show error message if user is outside the office */}
        {!isInsideOffice && (
          <Text variant="bodyMedium" style={styles.error}>
            Please go back to the office during working hours!
          </Text>
        )}

        <Text variant="titleLarge" style={styles.title}>
          {`Tap here to check ${isCheckedIn ? `Out` : `In`}`}
        </Text>

        {/* Button to check in or out */}
        <Button
          mode="contained"
          style={isCheckedIn ? styles.checkout_button : styles.checkin_button}
          onPress={handleCheckInOut}
          disabled={!isInsideOffice} // Disable button if not inside office
        >
          {isCheckedIn ? "Check Out" : "Check In"}
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
