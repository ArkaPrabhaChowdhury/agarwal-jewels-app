import React, { useRef, useState } from "react";
import { Button, Card, Text, View, Switch } from "react-native-ui-lib";
import { theme } from "../styles";
import { ScrollView, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../utils";
import { useFocusEffect, useNavigation } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Loading from "./loading";
import Popup from "../popup";
import Toast from "react-native-toast-message";

const WalletScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isNeeded, setIsNeeded] = useState(true);
  const [upi, setUpi] = useState("");
  const [balance, setBalance] = useState("");
  const [grams, setGrams] = useState("");
  const [sellGrams, setSellGrams] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [rate, setRate] = React.useState(0);
  const [sellRate, setSellRate] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const toastRef = useRef(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchWallet();
      getPhone();
    }, [])
  );

  useEffect(() => {
    getRate();
  }, []);

  const getRate = async () => {
    axios
      .get(`${apiURL}/rate`)
      .then((res) => {
        console.log(res.data[0].goldrate);
        setRate(res.data[0].goldrate);
        setSellRate(res.data[0].sellingRate);
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

  const getPhone = async () => {
    const id = await AsyncStorage.getItem("userId");
    axios
      .get(`${apiURL}/users/${id}`)
      .then((res) => {
        setPhone(res.data.phonenumber);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSellGrams = (text) => {
    setSellGrams(text);
    const convertedAmount = text ? parseFloat(text) * sellRate : 0; // Set to 0 if empty
    setSellAmount(convertedAmount.toFixed(2));
  };

  const handleSellAmount = (text) => {
    setSellAmount(text);
    const convertedAmount = text ? parseFloat(text) / sellRate : 0; // Set to 0 if empty
    setSellGrams(convertedAmount.toFixed(2));
  };

  const handleUpi = (text) => {
    setUpi(text);
  };

  const handleToggle = () => {
    setIsOnline(!isOnline);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSell = async () => {
    if (
      sellAmount == "" ||
      sellGrams == "" ||
      sellAmount == 0 ||
      sellGrams == 0
    ) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid amount or grams",
      });
      console.log("Please enter a valid amount or grams");
      return;
    }

    if (
      parseFloat(sellAmount) > parseFloat(balance) ||
      parseFloat(sellGrams) > parseFloat(grams)
    ) {
      console.log(sellAmount, balance, sellGrams, grams);
      Toast.show({
        type: "error",
        text1: "Insufficient funds",
      });
      console.log("Insufficient funds");
      return;
    }
    const id = await AsyncStorage.getItem("userId");

    const user = await axios.get(`${apiURL}/users/${id}`);
    if (!user.data.kyc_number) {
      Toast.show({
        type: "error",
        text1: "Please complete your KYC first here",
        onPress: () => {
          navigation.navigate("Profile");
        },
      });
      return;
    }

    let req;

    if (isOnline) {
      req = {
        clientId: id,
        UPI: upi,
        phonenumber: phone,
        rate: sellRate,
        grams: sellGrams,
        isOnline: isOnline,
        status: false,
      };
    } else {
      req = {
        clientId: id,
        phonenumber: phone,
        rate: sellRate,
        grams: sellGrams,
        isOnline: isOnline,
        status: false,
      };
    }
    try {
      const res = axios.post(`${apiURL}/sell`, req);
      if (res) {
        Toast.show({
          type: "success",
          text1: "Request sent successfully",
        });
      }
    } catch (err) {
      console.log("Error in selling gold");
    }
  };

  return (
    <ScrollView flex-1 center>
      <View center>
        <Card
          padding-12
          center
          marginT-24
          marginH-18
          style={{
            width: Platform.select({
              web: 300,
              default: "full",
            }),
          }}
        >
          <Text text60BO marginB-8>
            Wallet Balance
          </Text>
          {loading ? (
            <Text>
              <Loading />
            </Text>
          ) : (
            <Text text40H center color={theme}>
              ₹ {balance} {"\n"}
              {grams} grams
            </Text>
          )}
        </Card>

        <View marginT-24 center>
          <Button
            label="View Transaction History"
            backgroundColor={theme}
            onPress={() => {
              navigation.navigate("History");
            }}
          />
        </View>

        {/* Sell Gold */}
        <Card flex-1 center marginT-24 marginH-12 paddingH-12 paddingV-24>
          <View flex-1 center>
            <Text text50 color={theme}>
              Quick sell
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text text60H>Offline</Text>
            <Switch
              onColor={theme}
              value={isOnline}
              onValueChange={handleToggle}
              marginV-8
              marginH-10
            />
            <Text text60H>Online</Text>
          </View>

          {isOnline ? (
            <View>
              <TextInput
                style={{
                  width: 240,
                  height: 50,
                  borderRadius: 5,
                  backgroundColor: "#f1f1f1",
                  paddingLeft: 12,
                }}
                placeholder="UPI ID (Optional)"
                inputMode="text"
                value={upi}
                onChangeText={handleUpi}
                autoCorrect={false}
                autoComplete="off"
                spellCheck={false}
              />
            </View>
          ) : (
            <View>
              <Button
                label="Address"
                backgroundColor={theme}
                onPress={togglePopup}
              />
              <Popup
                isVisible={isPopupVisible}
                text={
                  "Agrawal Jewellers, Kagdi Pura, Tilak chowk, Vidisha (M.P) 464001"
                }
                onClose={togglePopup}
              />
            </View>
          )}
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
              gap: 24,
            }}
          >
            <TextInput
              style={{
                width: 120,
                height: 50,
                marginBottom: 20,
                borderRadius: 5,
                backgroundColor: "#f1f1f1",
                paddingLeft: 12,
              }}
              placeholder="Grams"
              inputMode="numeric"
              keyboardType="numeric"
              value={sellGrams}
              onChangeText={handleSellGrams}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />
            <View marginT-12>
              <FontAwesome5 name="exchange-alt" size={24} color="black" />
            </View>
            <TextInput
              style={{
                width: 120,
                height: 50,
                marginBottom: 20,
                borderRadius: 5,
                backgroundColor: "#f1f1f1",
                paddingLeft: 12,
                color: "black",
              }}
              placeholder="Amount"
              inputMode="numeric"
              keyboardType="numeric"
              value={sellAmount}
              onChangeText={handleSellAmount}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
              editable={false}           
            />
          </View>
          <Button
            label="Sell"
            backgroundColor={theme}
            marginT-24
            onPress={handleSell}
          />
        </Card>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default WalletScreen;
