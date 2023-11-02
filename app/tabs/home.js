import {
  Button,
  Card,
  KeyboardAwareScrollView,
  TextField,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import Text from "react-native-ui-lib/text";
import { commonStyles, theme } from "../styles";
import { Platform, StyleSheet, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { apiURL } from "../../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import Loading from "./loading";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";

const HomeScreen = () => {
  const [rate, setRate] = useState("0000");
  const [buyGrams, setBuyGrams] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [activeButton, setActiveButton] = useState("Gold");
  const [balance, setBalance] = useState("0.00");
  const [grams, setGrams] = useState("0.0000");
  const toastRef = useRef(null);

  const redirectUrl = Platform.select({
    ios: "agarwaljewelsapp://dashboard",
    android: "agarwaljewelsapp//:dashboard",
    default: "agarwaljewelsapp//:dashboard",
    web: "https://agarwal-jewellers.vercel.app/dashboard",
  });

  useEffect(() => {
    getRate();
    console.log(redirectUrl);
  }, []);

  const getRate = async () => {
    axios
      .get(`${apiURL}/rate`)
      .then((res) => {
        console.log(res.data[0].goldrate);
        setRate(res.data[0].goldrate);
        setStatus(res.data[0].status);
        fetchWallet();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showToast = (message) => {
    if (toastRef.current) {
      toastRef.current.show(message, 2000);
    }
  };

  const handleBuyGrams = (text) => {
    setBuyGrams(text);
    const convertedAmount = text ? parseFloat(text) * rate : 0; // Set to 0 if empty
    setBuyAmount(convertedAmount.toFixed(2));
  };

  const handleBuyAmount = (text) => {
    setBuyAmount(text);
    const convertedAmount = text ? parseFloat(text) / rate : 0; // Set to 0 if empty
    setBuyGrams(convertedAmount.toFixed(4));
  };

  const getId = async () => {
    const id = await AsyncStorage.getItem("userId");
    setClientId(id);
    console.log(id);
  };

  const fetchWallet = async () => {
    const id = await AsyncStorage.getItem("userId");
    axios
      .get(`${apiURL}/users/${id}`)
      .then((res) => {
        if (res.data.wallet) {
          const newBal = parseFloat(res.data.wallet);
          setBalance(newBal.toFixed(2));
        } else {
          setBalance(0);
          setLoading(false);
        }
        if (res.data.grams) {
          const newGrams = parseFloat(res.data.grams);
          setGrams(newGrams.toFixed(4));
          setLoading(false);
        } else {
          setGrams(0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePurchase = async () => {
    if (buyAmount == "" || buyGrams == "" || buyAmount == 0 || buyGrams == 0) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid amount or grams",
      });
      console.log("Please enter a valid amount or grams");
      return;
    }
    const id = await AsyncStorage.getItem("userId"); // Replace with the actual user ID
    axios
      .post(`${apiURL}/upi/create_order/${id}`, {
        amount: buyAmount,
        grams: buyGrams,
        url: redirectUrl,
      })
      .then((res) => {
        console.log(res.data);
        Linking.openURL(res.data.data.payment_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputStyle = {
    flex: 1,
    height: 50,
    borderRadius: 5,
    paddingLeft: 12,
    // Add other styles that are common across all platforms here
  };
  
  // Conditionally add the outline style for web
  if (Platform.OS === 'web') {
    inputStyle.outline = 'none';
  }
  

  // const handlePurchase = async () => {
  //   if (buyAmount == "" || buyGrams == "" || buyAmount == 0 || buyGrams == 0) {
  //     showToast("Please enter a valid amount or grams");
  //     console.log("Please enter a valid amount or grams");
  //     return;
  //   }

  //   try {
  //     const id = await AsyncStorage.getItem("userId"); // Replace with the actual user ID
  //     const response = axios.patch(`${apiURL}/transfers/wallet/${id}`, {
  //       purchased: buyAmount,
  //       action: "+",
  //     });
  //     const gres = axios.patch(`${apiURL}/transfers/grams/${id}`, {
  //       grams: buyGrams,
  //       action: "+",
  //     });
  //     axios
  //       .post(`${apiURL}/transfers/create`, {
  //         clientId: id,
  //         grams: buyGrams,
  //         amount: buyAmount,
  //       })
  //       .then((res) => {
  //         console.log(res.data.id);
  //         axios
  //           .post(`${apiURL}/upi/create_order/${id}`, {
  //             transferId: res.data.id,
  //             amount: buyAmount,
  //           })
  //           .then((res) => {
  //             console.log(res.data);
  //             Linking.openURL(res.data.data.payment_url);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     console.log("Wallet updated successfully");
  //   } catch (error) {
  //     console.error("Error: ", error);
  //     this.toast.show("Purchase Failed", 2000);
  //   }
  // };

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  const handleYoutube = () => {
    Linking.openURL("https://youtube.com/@agrawaljewellersvidisha3049?si=8l-XPsrlwY5l3Nbk");
  }

  return (
    <KeyboardAwareScrollView center paddingT-12>
      <View backgroundColor={theme} paddingB-12 style={
        {
          paddingBottom:Platform.select({
            web:25,
            default:12
          })
        }
      }>
        <View paddingB-12 paddingH-12>
          <Text style={styles.heading} center>
            Available Balance
          </Text>
        </View>

        <View flex row center>
          <View marginR-24>
            <Text style={styles.balance}>{grams} gm</Text>
            <Text center color="white">
              Gold
            </Text>
            <Text center color="white">
              24k-999.0
            </Text>
          </View>
          <View>
            <Text style={styles.balance}>0.0000 gm</Text>
            <Text center color="white">
              Silver
            </Text>
            <Text center color="white">
              24k-999.0
            </Text>
          </View>
        </View>

        <View center>
          <View
            style={{
              height:Platform.select({
                default:0.2,
                web:0
              }), // or 2 if you want a thicker line
              width: "80%", // or a specific width if you want the line to be shorter
              backgroundColor: "white", // or any color you prefer
              marginHorizontal: 8, // space between line and text
              marginVertical: 14,
            }}
          />
        </View>


        <View >
          <Text style={styles.heading} center>
            Rates
          </Text>
        </View>

        <View flex row center>
          <View marginR-24>
            {status ? (
              <Text style={styles.balance}>{rate} ₹/gm</Text>
            ) : (
              <Text></Text>
            )}
            <View flex center>
              <Image
                source={require("../assets/gold_coin.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text center color="white">
              Gold
            </Text>
          </View>
          <View>
            {status ? (
              <Text style={styles.balance}>{rate / 2} ₹/gm</Text>
            ) : (
              <Text></Text>
            )}
            <View flex center>
              <Image
                source={require("../assets/silver.png")}
                style={{ width: 45, height: 45 }}
              />
            </View>
            <Text center color="white">
              Silver
            </Text>
          </View>
        </View>
      </View>

      {/* {status ? (
          <Card padding-12>
            <Text text60BO marginB-8>
              Current Gold Rate/gm
            </Text>

            {loading ? (
              <Text center>
                <Loading />
              </Text>
            ) : (
              <Text text40H color={theme} center>
                ₹ {rate}
              </Text>
            )}
          </Card>
        ) : (
          <View></View>
        )} */}

      <Card flex-1 center paddingV-24>
        <View>
          <Text text50 color={theme}>
            Quick buy
          </Text>
        </View>
        <View flex row marginT-24>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === "Gold"
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress("Gold")}
            marginR-24
          >
            <Text style={styles.buttonText}>Gold</Text>
            <Text color="white">24k-999.0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === "Silver"
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress("Silver")}
          >
            <Text style={styles.buttonText}>Silver</Text>
            <Text color="white">24k-999.0</Text>
          </TouchableOpacity>
        </View>

        <View
          marginT-24
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 120,
          }}
        >
          <Text text60H>Grams</Text>
          <Text text60H>Amount</Text>
        </View>

        <View
          marginT-24
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center", // Align items vertically
            gap: 24,
          }}
        >
          {/* Grams Input with Icon */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center", // Align items vertically
              width: 120,
              height: 50,
              marginBottom: 20,
              borderRadius: 5,
              backgroundColor: "#f1f1f1",
              
            }}
          >
            <FontAwesome5
              name="balance-scale"
              size={20}
              color="black"
              style={{ marginLeft: 12 }}
            />
            <TextInput
              style={inputStyle}
              placeholder="Grams"
              keyboardType="numeric"
              inputMode="numeric"
              value={buyGrams}
              onChangeText={handleBuyGrams}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
              
            />
          </View>

          {/* Exchange Icon */}
          <View marginB-16>
            <FontAwesome5 name="exchange-alt" size={24} color="black" />
          </View>

          {/* Amount Input with Icon */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center", // Align items vertically
              width: 120,
              height: 50,
              marginBottom: 20,
              borderRadius: 5,
              backgroundColor: "#f1f1f1",
            }}
          >
            <FontAwesome5
              name="rupee-sign"
              size={20}
              color="black"
              style={{ marginLeft: 12 }}
            />
            <TextInput
              style={inputStyle}
              placeholder="Amount"
              inputMode="numeric"
              keyboardType="numeric"
              value={buyAmount}
              onChangeText={handleBuyAmount}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />
          </View>
        </View>
            <TouchableOpacity onPress={handleYoutube}>
            <Text underline >See how it works</Text>
            </TouchableOpacity>
        <Button
          label="Buy Now"
          backgroundColor={theme}
          marginT-24
          onPress={handlePurchase}
        />
      </Card>
      <Toast />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  line: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    paddingHorizontal:
    Platform.select({
      web:20,
      default:0
    })
  },
  activeButton: {
    backgroundColor: theme, // set the background color to the theme color
  },
  inactiveButton: {
    backgroundColor: "#8b8b8b", // set the background color to white
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
