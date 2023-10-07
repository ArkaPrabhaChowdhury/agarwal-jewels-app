import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { commonStyles } from "./styles";
import Toast from "react-native-easy-toast";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const handleContinue = () => {
    if (firstName === "") {
      this.toast.show("Please enter your first name", 2000);
      return;
    } else if (lastName === "") {
      this.toast.show("Please enter your last name", 2000);
      return;
    } else if (country === "") {
      this.toast.show("Please enter your country of residence", 2000);
      return;
    }
    //Enter backend code
    console.log("First Name: ", firstName);
  };

  const handleRedirect = () => {
    navigation.navigate("login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={commonStyles.text}>Create an Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"black"}
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"black"}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor={"black"}
            onChangeText={(text) => setCountry(text)}
            value={country}
          />
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <View style={styles.smallText}>
            <Text style={styles.already}>Already have an account? </Text>
            <TouchableOpacity onPress={handleRedirect}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Toast ref={(toast) => (this.toast = toast)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 24,
    padding: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
    marginBottom: 34,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  button: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#73150F",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  account: {
    marginTop: 20,
  },
  login: {
    color: "#73150F",
    fontSize: 16,
  },
  smallText: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 24,
  },
  already: {
    fontSize: 16,
  },
});

export default RegisterPage;
