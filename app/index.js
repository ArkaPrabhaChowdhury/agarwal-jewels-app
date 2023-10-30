import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFocusEffect, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppIntroSlider from "react-native-app-intro-slider";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";


  // Add the OneSignal import here
  // import { LogLevel, OneSignal } from 'react-native-onesignal';
  // import Constants from "expo-constants";

  import Constants from "expo-constants";


SplashScreen.preventAutoHideAsync();
const HomeScreen = () => {
  const navigation = useNavigation();
  const [showSlider, setShowSlider] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);



  //One signal thingy
  useEffect(() => {
    // Set the log level
    // OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize OneSignal with your OneSignal app ID
    // OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
    // Request notification permissions
    // OneSignal.Notifications.requestPermission(true);
    
    prepareAndCheck();
  }, []);




  useFocusEffect(
    useCallback(() => {
      prepareAndCheck();
    }, [])
  );

  async function prepareAndCheck() {
    try {
      const token = await AsyncStorage.getItem("usertoken");
      const introShown = await AsyncStorage.getItem("introShown");
      if (Platform.OS === "web") {
        navigation.navigate("login");
      }
      console.log("Token:", token);
      console.log("Intro shown:", introShown);

      if (token) {
        console.log("Navigating to dashboard...");
        navigation.navigate("dashboard");
      } else if (introShown) {
        console.log("Navigating to login...");
        navigation.navigate("login");
      } else {
        console.log("Showing slider...");
        setShowSlider(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setShowSlider(true);
    } finally {
      setAppIsReady(true);
    }
  }

  const slides = [
    {
      key: "1",
      title: "Welcome to Agarwal Jewellers",
      text: "We are your trusted partner for buying and selling gold.",
      image: require("./assets/jewels.gif"),
      backgroundColor: "white",
    },
    {
      key: "2",
      title: "Get the latest gold rate",
      text: "We provide the latest gold rate in the market.",
      image: require("./assets/gold.gif"),
      backgroundColor: "white",
    },
  ];

  const renderSlide = ({ item }) => {
    return (
      <View style={styles.container}>
        <Image style={styles.imageStyle} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.imageText}>{item.text}</Text>
      </View>
    );
  };

  if (showSlider) {
    return (
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          data={slides}
          renderItem={renderSlide}
          style={styles.slide}
          showNextButton={true}
          renderNextButton={() => (
            <Ionicons
              name="arrow-forward-outline"
              size={24}
              color="black"
              style={{ paddingTop: 12, paddingRight: 8 }}
            />
          )}
          showDoneButton={true}
          renderDoneButton={() => (
            <Text
              style={{
                paddingTop: 12,
                paddingRight: 8,
              }}
            >
              Sign Up
            </Text>
          )}
          showSkipButton={true}
          renderSkipButton={() => (
            <Text
              style={{
                paddingTop: 12,
                paddingLeft: 8,
              }}
            >
              Skip
            </Text>
          )}
          onDone={() => {
            AsyncStorage.setItem("introShown", "true");
            navigation.navigate("signup");
          }}
          onSkip={() => {
            AsyncStorage.setItem("introShown", "true");
            navigation.navigate("signup");
          }}
          dotClickEnabled={true}
          dotStyle={{ backgroundColor: "gray" }}
          activeDotStyle={{ backgroundColor: "#006b9f" }}
        />
        <Toast/>
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  imageStyle: {
    width: "35%",
    height: "35%",
    aspectRatio: 1,
  },
  slide: {
    backgroundColor: "white",
  },
  imageText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
export default HomeScreen;
