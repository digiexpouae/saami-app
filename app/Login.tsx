import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { login } from '../services/authService';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the eye icon

export default function LoginScreen() {
    const [secureText, setSecureText] = useState(true); // State to toggle password visibility

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();


  const handleLogin = async () => {


    try {
      const token = await login(email, password);
      console.log(token);

      await AsyncStorage.setItem('userToken', token);
      router.push("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}

        <Image
          source={require("../assets/images/Logo.png")} // Preloaded logo
          style={styles.logo}
          resizeMode="contain"
        />

      <Text style={styles.title}>ATTEND ACE</Text>

      {/* Login Text with Underline */}
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Log in</Text>
        <View style={styles.underline} />
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureText(!secureText)}
          >
            <Ionicons
              name={secureText ? "eye-off" : "eye"} // Change icon based on visibility state
              size={20}
              color="#999"
            />
          </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
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
    //  justifyContent: "flex-end", // Moves the content to the bottom
     // Adjust to control bottom spacing// Adjust to control bottom spacing
  },
  logo: {
    width: 200,
    height: 100,
    // marginBottom: 20, // Space between the logo and the title
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
  marginLeft:210
  // Space between "Forgot Password?" and the login button
},
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
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
