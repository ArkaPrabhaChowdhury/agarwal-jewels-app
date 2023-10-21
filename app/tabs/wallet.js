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
import Toast from "react-native-easy-toast";
import Popup from "../popup";

const WalletScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [upi, setUpi] = useState("");
  const [balance, setBalance] = useState("");
  const [grams, setGrams] = useState("");
  const [sellGrams, setSellGrams] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [rate, setRate] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const toastRef = useRef(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchWallet();
      getEmail();
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
        setLoading(false);
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
          setLoading(false);
        } else {
          setBalance();
        }
        if (res.data.grams) {
          const newGrams = parseFloat(res.data.grams);
          setGrams(newGrams.toFixed(2));
          setLoading(false);
        } else {
          setBalance(0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEmail = async () => {
    const id = await AsyncStorage.getItem("userId");
    axios
      .get(`${apiURL}/users/${id}`)
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSellGrams = (text) => {
    setSellGrams(text);
    const convertedAmount = text ? parseFloat(text) * rate : 0; // Set to 0 if empty
    setSellAmount(convertedAmount.toFixed(2));
  };

  const handleSellAmount = (text) => {
    setSellAmount(text);
    const convertedAmount = text ? parseFloat(text) / rate : 0; // Set to 0 if empty
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
      showToast("Please enter a valid amount or grams");
      console.log("Please enter a valid amount or grams");
      return;
    }
    if (sellAmount > balance || sellGrams > grams) {
      showToast("Insufficient funds");
      console.log("Insufficient funds");
      return;
    }
    const id = await AsyncStorage.getItem("userId");
    let req;

    if (isOnline) {
      req = {
        clientId: id,
        UPI: upi,
        email: email,
        rate: rate,
        grams: sellGrams,
        status: false,
      };
    } else {
      req = {
        clientId: id,
        email: email,
        rate: rate,
        grams: sellGrams,
        status: false,
      };
    }
    try {
      const res = axios.post(`${apiURL}/sell`, req);
      if (res) {
        showToast("Request sent successfully");
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
                placeholder="UPI ID"
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
              <Popup isVisible={isPopupVisible} text={"This is the address"} onClose={togglePopup} />
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
              }}
              placeholder="Amount"
              inputMode="numeric"
              keyboardType="numeric"
              value={sellAmount}
              onChangeText={handleSellAmount}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
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
      <Toast ref={toastRef} />
    </ScrollView>
  );
};

export default WalletScreen;
