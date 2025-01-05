import useDistance from "@/hooks/useDistance";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function HomeScreen() {
  const {
    isInsideOffice,
    isCheckedIn,
    isLoading,
    handleCheckInOut,
    handleLogout,
  } = useDistance();
  console.log(isInsideOffice);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant='bodyMedium' style={styles.error}>
          {!isInsideOffice && "Please Go Back To Office In Working Hours!!"}
        </Text>
        <Text variant='titleLarge' style={styles.title}>
          {`Tap Here To Check ${isCheckedIn ? `Out` : `In`}`}
        </Text>
        <Button
          mode='contained'
          style={isCheckedIn ? styles.checkout_button : styles.checkin_button}
          onPress={handleCheckInOut}
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
