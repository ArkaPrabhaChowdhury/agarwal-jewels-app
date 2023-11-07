import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Platform,Modal,FlatList } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, TouchableOpacity } from "react-native";
import HomeScreen from "./tabs/home";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { theme } from "./styles";
import { useFocusEffect } from "expo-router";
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
import { LogLevel, OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();
const DashboardPage = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
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

  if ((Platform.OS === "android" || Platform.OS === "ios") && Constants.appOwnership !== 'expo') {
    useEffect(() => {
      const initializeOneSignal = async () => {
        const hasInitialized = await AsyncStorage.getItem(
          "hasInitializedOneSignal"
        );

        if (hasInitialized === null) {
          // Your initialization code
          const getUserId = async () => {
            const id = await AsyncStorage.getItem("userId");
            OneSignal.login(id);
          };

          OneSignal.Debug.setLogLevel(LogLevel.Verbose);
          OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
          OneSignal.Notifications.requestPermission(true);
          getUserId();

          // After initialization, set the flag so this doesn't run again
          await AsyncStorage.setItem("hasInitializedOneSignal", "true");
        }
      };

      initializeOneSignal();
    }, []);
  }

  useFocusEffect(
    React.useCallback(() => {
      checkToken();
    }, [])
  );

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("userId");
    if (!token) {
      navigation.navigate("login");
    }
  };

  const openWhatsapp = () => {
    Linking.openURL(
      "https://wa.me/919827248783?text=Hi%2C%20I%20have%20a%20query%20regarding%20the%20app."
    );
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleMenuItemClick = (item) => {
    if (item.id === 1) {
      navigation.navigate("faq");
    } else if (item.id === 2) {
      navigation.navigate("refund");
    } else if (item.id === 3) {
      navigation.navigate("terms");
    }
    else if (item.id === 4) {
      navigation.navigate("privacy");
    }
    else if (item.id === 5) {
      navigation.navigate("contact");
    }
    else if (item.id === 6) {
      AsyncStorage.removeItem("userId");
      navigation.navigate("login");
    }
    toggleMenu();
  }

  const menuItems = [
    { id: 1, title: 'FAQs' },
    { id: 2, title: 'Refund Policy' },
    { id: 3, title: 'Terms and Conditions' },
    { id: 4, title: 'Privacy Policy'},
    { id: 5, title: 'Contact Us'},
    { id: 6, title: 'Logout'},
    // Add more menu items as needed
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.navbar}>
      <TouchableOpacity onPress={toggleMenu}>
        {isMenuVisible ? (
          <AntDesign name="close" size={28} color="white" />
        ) : (
          <Ionicons name="ios-menu" size={28} color="white" />
        )}
      </TouchableOpacity>

        <Image source={require("./assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={openWhatsapp}>
          <Image
            style={styles.supportIcon}
            source={require("./assets/support_new.png")}
          />
        </TouchableOpacity>

        {isMenuVisible && (
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleMenuItemClick(item)}>
              <Text style={styles.menuItem}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
      web: 75,
      default: 90,
    }),
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#de390b",
    paddingTop: Platform.select({
      web: 10,
      default: 40,
    }),
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: "center",

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  supportIcon: {
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
  menu: {
    position: 'absolute',
    top: Platform.select(
      {
        web:50,
        android: 75,
      }
    ),
    left: Platform.select(
      {
        web:40,
        android: 30,
      }
    ),
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, // Increase shadow opacity for better visibility
    shadowRadius: 5, // Increase shadow radius for better visibility
    elevation: 5, // Increase elevation for better visibility
    zIndex: 2, // Ensure the popup appears above other elements
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 5,
    color: 'black', // Set text color to black for better visibility
  },
  closeButton: {
    fontSize: 18,
    color: 'blue', // Change to your desired color
    marginTop: 10,
  },
});

export default DashboardPage;
