import useLocationSlice from "@/hooks/useEmployee";
import { Redirect } from "expo-router";
import React from "react";
import { AppRegistry, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import "../global.css";
import { Stack } from "expo-router";
import LoginScreen from "./login";

const index = () => {
  const token = useLocationSlice((state) => state.isLoggedIn);

  console.log("Token", token);

  return (
    <PaperProvider>
      {true ? (
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
