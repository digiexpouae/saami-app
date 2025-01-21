import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { AppRegistry, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import "../global.css";
import LoginScreen from "./Login";

const index = () => {
  const [key, setKey] = useState<string|null>(null);
  AsyncStorage.getItem("userToken").then((res) => {
    setKey(res);
  });


  return (
    <PaperProvider>
      {key ? (
        <>
          <Redirect href={"/home"} />
        </>
      ) : (
        <>
          <LoginScreen />
        </>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

AppRegistry.registerComponent("Saami App", () => index);
export default index;
