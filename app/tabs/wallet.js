import React, { useState } from "react";
import { Button, Card, Switch, Text, View } from "react-native-ui-lib";
import { theme } from "../styles";
import { ScrollView, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../utils";
import { useFocusEffect, useNavigation } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Loading from "./loading";
const WalletScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [upi, setUpi] = useState("");
  const [balance, setBalance] = useState("");
  const [grams, setGrams] = useState("");
  const [sellGrams, setSellGrams] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [rate, setRate] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchWallet();
    }, [])
  );

  const fetchWallet = async () => {
      const id = await AsyncStorage.getItem("userId");
      axios.get(`${apiURL}/users/${id}`)
      .then((res) => {
        if(res.data.wallet){
          const newBal = parseFloat(res.data.wallet);
          setBalance(newBal.toFixed(2));
          setLoading(false);
        }
        else{
          setBalance()
        }
        if(res.data.grams){
          const newGrams = parseFloat(res.data.grams);
          setGrams(newGrams.toFixed(2));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err)
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
  }

  const handleToggle = () => {
    setIsOnline(!isOnline);
  }

  const handleSell = async () => {};

  return (
    <ScrollView flex-1 center>
      <View center>
        <Card padding-12 center marginT-24 marginH-18 style={{
          width: Platform.select({
            web:300,
            default:"full"
          })
        }}>
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
          <View>
            <Switch value={isOnline} onValueChange={handleToggle} marginV-8/>
          </View>

          { isOnline ? (
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

            </View>
          )

          }
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
    </ScrollView>
  );
};


export default WalletScreen