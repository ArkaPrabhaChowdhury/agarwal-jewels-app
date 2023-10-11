import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { Link, SplashScreen, useNavigation } from "expo-router";
import { commonStyles } from "./styles";
import { ScrollView } from "react-native";
import axios from "axios";
import { apiURL } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const LoginPage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("swToken");
      if (token) {
        // User is already authenticated, navigate to the dashboard screen
        navigation.navigate("dashboard");
      }
    } catch (error) {
      console.log("Error checking authentication:", error);
    }
  };

  const handleLogin = () => {
    onSubmit({ username, password });
  };

  const onSubmit = (val) => {
    if (val.username === "") {
      this.toast.show("Please enter your email address", 2000);
      return;
    } else if (
      !val.username.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      this.toast.show("You have entered an invalid address", 2000);
      return;
    } else if (val.password === "") {
      this.toast.show("Please enter your password", 2000);
      return;
    } else {
      checkCredentials(val.username, val.password)
      .catch((error) => {
        console.error("Error checking credentials:", error);
      });
    }
  };

  const checkCredentials = async (username, password) => {
    try {
      // Make the POST request using Axios
      const response = await axios.post(`${apiURL}/users/check-login`, {
        email: username,
        password: password,
      });

      if (response.data.success) {
        // If the response indicates success, navigate to the dashboard
        await AsyncStorage.setItem("userId", response.data.id);
        navigation.navigate('dashboard');
        this.toast.show("Login successful", 2000);
        return true; // Return true for success
      } else {
        this.toast.show("Invalid Email or Password", 2000);
        return false; // Return false for failure
      }
    } catch (error) {
      console.error("Error checking credentials:", error);
      throw error; // Rethrow the error for catch block handling
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={commonStyles.container}>
        <Text style={commonStyles.text}>Welcome back!</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Email"
          placeholderTextColor={"black"}
          value={username}
          onChangeText={setUsername}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <TextInput
            style={[commonStyles.input, { flex: 1 }]}
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor={"black"}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={{ marginTop: -15, position: "absolute", right: 15, top: 28 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
          <Text style={commonStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={commonStyles.smallText}>
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.navigate("signup")}
            style={styles.register}
          >
            Sign Up
          </Text>
        </Text>
      </ScrollView>
      <Toast ref={(toast) => (this.toast = toast)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  register: {
    color: "#73150F",
    fontWeight: "bold",
  },
});

export default LoginPage;