import React, { useState,useRef } from "react";
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
import Toast from "react-native-toast-message";  
import axios from "axios";
import { apiURL } from "../utils";


const RegisterPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  const handleContinue = () => {
    // if (email === "") {
    //   toastRef.current.show("Please enter your email", 2000);
    //   return;
    // } else 
     if (password === "") {
      toastRef.current.show("Please enter your Password ", 2000);
      return;
    } else if (phone === "") {
      Toast.show({
        type: 'error',
        text1: 'Please enter your phone number',
      });
      return;
    } else if (email.indexOf("@") === -1) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email',
      });
      return;
    } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid phone number with 10 digits',
      });
      return;
    }
    else{
      
     axios.post(`${apiURL}/users`, {
       // email : email,
        password : password,
        phonenumber : phone,
      })
      .then((response) => {
        console.log(response.data);
        Toast.show({
          type: 'success',
          text1: 'Account created successfully!',
        });
      })
      .catch((error) => {
        if(error.response.status === 401){
          console.log(error.response.data);
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
          });
        
      }
      else if(error.response.data.message === "User already exists"){
        console.log(error.response.data);
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      }
        else console.log(error);
      });

    }
  }

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
          {/* <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"black"}
            onChangeText={(text) => setEmail(text)}
            value={email}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor={"black"}
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"black"}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.smallText}>
            <Text style={styles.already}>Already have an account? </Text>
            <TouchableOpacity onPress={handleRedirect}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView> 
      <Toast/>
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
    fontWeight: "bold",
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
