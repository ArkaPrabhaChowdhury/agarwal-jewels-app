import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, TouchableOpacity } from "react-native";
import HomeScreen from "./tabs/home";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { theme } from "./styles";
import { useFocusEffect } from "expo-router/src/useFocusEffect";
import { BackHandler } from "react-native";
import { Alert } from "react-native";
import Profile from "./tabs/profile";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import WalletScreen from "./tabs/wallet";
import NotifcationsScreen from "./tabs/notifications";
import { Image } from "expo-image";
import { View } from "react-native-ui-lib";
import HistoryScreen from "./tabs/history";
import AsyncStorage from "@react-native-async-storage/async-storage";

 import { LogLevel, OneSignal } from 'react-native-onesignal';
 import Constants from "expo-constants";

const Tab = createBottomTabNavigator();
const DashboardPage = () => {
  const windowHeight = Dimensions.get("window").height;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit App",
          "Are you sure you want to exit?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Exit", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true; // Prevent default back button behavior
      };

      // Add event listener for hardware back press
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Clean up event listener on component unmount
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  
  useFocusEffect(
    React.useCallback(() => {
      const getUserId = async () => {
        const id = await AsyncStorage.getItem("userId"); // Replace with the actual user ID
        // Set the external id of the user
        OneSignal.login(id);
      };
  
      // Set the log level
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
      // Initialize OneSignal with your OneSignal app ID
      OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
      // Request notification permissions
      OneSignal.Notifications.requestPermission(true);
  
      getUserId();
      checkToken();
    }, [])
  );
  
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("userId");
    if (!token) {
      navigation.navigate("login");
    }
  }
  const navigation = useNavigation();

  const openWhatsapp = () => {
    Linking.openURL(
      "https://wa.me/919827248783?text=Hi%2C%20I%20have%20a%20query%20regarding%20the%20app."
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.navbar}>
        <Image source={require("./assets/logo.png")} style={styles.logo}/>

        <TouchableOpacity onPress={openWhatsapp}>
          <Image
            style={styles.supportIcon}
            source={require("./assets/support_new.png")}
          />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: windowHeight * 0.08, paddingBottom: 6 },
          gestureEnabled: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home" size={26} color={theme} />
              ) : (
                <Ionicons name="home-outline" size={26} color={theme} />
              ),
            headerShown: false,
            tabBarActiveTintColor: theme,
            tabBarInactiveTintColor: theme,
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-wallet-sharp" size={26} color={theme} />
              ) : (
                <Ionicons name="ios-wallet-outline" size={26} color={theme} />
              ),
            headerShown: false,
            tabBarActiveTintColor: theme,
            tabBarInactiveTintColor: theme,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="time-sharp" size={26} color={theme} />
              ) : (
                <Ionicons name="time-outline" size={26} color={theme} />
              ),
            headerShown: false,
            tabBarActiveTintColor: theme,
            tabBarInactiveTintColor: theme,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotifcationsScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="bell" size={24} color={theme} />
              ) : (
                <FontAwesome name="bell-o" size={24} color={theme} />
              ),
            headerShown: false,
            tabBarActiveTintColor: theme,
            tabBarInactiveTintColor: theme,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="user-circle-o" size={24} color={theme} />
              ) : (
                <FontAwesome name="user-circle" size={24} color={theme} />
              ),
            headerShown: false,
            tabBarActiveTintColor: theme,
            tabBarInactiveTintColor: theme,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  navigate: {
    height: 120,
  },
  navbar: {
    height: Platform.select({
      web:75,
      default:90
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#de390b",
    paddingTop: Platform.select({
      web:10,
      default:40
    }),
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo:{
    width: 50,
    height: 50,
  },
  supportIcon:{
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default DashboardPage;
