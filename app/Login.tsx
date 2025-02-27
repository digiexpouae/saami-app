import useLocationSlice from "@/hooks/useEmployee"; // Import Zustand store
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the eye icon
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import  { useEffect, useState, useRef } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { login } from "../services/authService";

import { sendTokenToServer } from "@/services/apiHandlers";
import { registerForPushNotificationsAsync } from "@/services/notificationService";
import * as Notifications from "expo-notifications";


export default function LoginScreen() {
  const [secureText, setSecureText] = useState(true); // State to toggle password visibility

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  const [error, setError] = useState("");
    const [expoPushToken, setExpoPushToken] = useState("");


  // util functions
  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricAvailable(compatible && enrolled);
  };

  const saveCredentials = async (email: string, password: string) => {
    await SecureStore.setItemAsync("userEmail", email);
    await SecureStore.setItemAsync("userPassword", password);
  };

  // Get stored credentials
  const getCredentials = async () => {
    const email = await SecureStore.getItemAsync("userEmail");
    const password = await SecureStore.getItemAsync("userPassword");
    return { email, password };
  };

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Fingerprint",
      fallbackLabel: "Enter Password",
    });

    if (result.success) {
      const { email, password } = await getCredentials();
      if (email && password) {
        Alert.alert("Success", `Logged in as ${email}`);
        // Here you can redirect the user to the home screen
        await handleLogin(email, password);
      } else {
        Alert.alert(
          "Error",
          "No saved credentials found. Please log in manually first."
        );
      }
    } else {
      Alert.alert("Error", "Authentication failed.");
    }
  };

  const router = useRouter();
  const { setToken, setUser } = useLocationSlice((state) => state);

  const handleLogin = async (email, password) => {
    try {
      const { token, user } = await login(email, password);
      await saveCredentials(email, password);

      await AsyncStorage.setItem("userToken", token);
      setToken(token);
      await sendTokenToServer({ appToken: expoPushToken, authtoken : token });
      if (user?.role === "admin") {
        router.push("/attendance");
      } else {
        router.push("/home");
      }
    } catch (err) {
      setError(err?.message);
    }
  };

  useEffect(() => {
    checkBiometricAvailability();
  }, []);



    const notificationListener = useRef<Notifications.Subscription | undefined>(
      undefined
    ); // Correct type
    const responseListener = useRef<Notifications.Subscription | undefined>(
      undefined
    ); // Correct type

    useEffect(() => {
      AsyncStorage.getItem("userToken").then((res) => {
        setKey(res);
      });

      registerForPushNotificationsAsync().then((token) => {
        if (token) {
          setExpoPushToken(token);
          console.log("TOKEN", token);


        }
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("Notification Received:", notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("Notification Response:", response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);


  return (
    <View style={styles.container}>
      {/* Logo Section */}

      <Image
        source={require("../assets/images/Logo.png")} // Preloaded logo
        style={styles.logo}
        resizeMode='contain'
      />

      <Text style={styles.title}>Saami Tradestar</Text>

      {/* Login Text with Underline */}
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Log in</Text>
        <View style={styles.underline} />
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor='#999'
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          style={styles.input}
          placeholderTextColor='#999'
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureText(!secureText)}
        >
          <Ionicons
            name={secureText ? "eye-off" : "eye"} // Change icon based on visibility state
            size={20}
            color='#999'
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity> */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => handleLogin(email, password)}
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      {isBiometricAvailable && (
        <TouchableOpacity
          onPress={handleBiometricAuth}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Fingerprint</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EEF7",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center", // Moves the content to the bottom
    paddingBottom: 80,
    //  justifyContent: "flex-center", // Moves the content to the bottom
    // Adjust to control bottom spacing// Adjust to control bottom spacing
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15, // Space between the logo and the title
  },
  loadingText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 80, // Space between the title and "Log in"
  },
  loginTextContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20, // Space between "Log in" and email input box
  },
  loginText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  underline: {
    width: 60, // Adjust this to match the text width
    height: 2,
    backgroundColor: "#000",
    marginTop: 2,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10, // Adjust for spacing between input fields and "Forgot Password?"
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
  },

  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 80,
  },
  forgotPassword: {
    alignSelf: "flex-end", // Aligns the text to the right
    color: "#000",
    fontSize: 14,
    marginBottom: 50,
    marginLeft: 210,
    // Space between "Forgot Password?" and the login button
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#18364a",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
