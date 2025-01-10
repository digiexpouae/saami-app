import useDistance from "@/hooks/useDistance";
import useGeoFencing from "@/hooks/useGeoFencing";
import { checkinApi, checkoutApi } from "@/services/apiHandlers";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

/*
1. Implement notify admin api  at enter and exit with correct event names
2. Implement Get Notify report api on activities screen
3. Implement Logic to allow/disallow to checkin checkout based of officeStatus
4. Show Attendance report of every user on attendance screen
*/
export default function HomeScreen() {

  const { regionName} =useGeoFencing()
  return (
    <View style={styles.container}>

      {/* <View style={styles.content}>
        <Text variant='bodyMedium' style={styles.error}>
          {!isInsideOffice && "Please Go Back To Office In Working Hours!!"}
        </Text>
        <Text variant='titleLarge' style={styles.title}>
          {`Tap Here To Check ${isCheckedIn ? `Out` : `In`}`}
        </Text>
        <Button
          mode='contained'
          style={isCheckedIn ? styles.checkout_button : styles.checkin_button}
          onPress={() => {
            isCheckedIn? checkoutApi() : checkinApi();
            handleCheckInOut();
          }}
        >
          {isCheckedIn ? "Check Out" : "Check In"}
        </Button>
      </View> */}
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
