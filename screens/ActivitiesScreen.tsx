import { StyleSheet, Text, Alert, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";



const ActivitiesScreen = () => {



  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
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
      </View> */}
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
