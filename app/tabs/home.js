import { Button, Card, TextField, View } from "react-native-ui-lib";
import Text from "react-native-ui-lib/text";
import { commonStyles, theme } from "../styles";
import { ScrollView, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { apiURL } from "../../utils";
import axios from "axios";
import Toast from "react-native-easy-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [rate, setRate] = useState("0000");
  const [grams, setGrams] = useState("");
  const [amount, setAmount] = useState("");
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    getRate();
  }, []);

  const getRate = async () => {
    axios
      .get(`${apiURL}/rate`)
      .then((res) => {
        console.log(res.data[0].goldrate);
        setRate(res.data[0].goldrate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGrams = (text) => {
    setGrams(text);
    const convertedAmount = text ? parseFloat(text) * rate : 0; // Set to 0 if empty
    setAmount(convertedAmount.toFixed(2));
  };

  const handleAmount = (text) => {
    setAmount(text);
    const convertedAmount = text ? parseFloat(text) / rate : 0; // Set to 0 if empty
    setGrams(convertedAmount.toFixed(2));
  };

  const getId = async () => {
    const id = await AsyncStorage.getItem("userId");
    setClientId(id);
    console.log(id);
  };

  const handlePurchase = async () => {
    try {
      const id = await AsyncStorage.getItem("userId"); // Replace with the actual user ID
      const response = axios.patch(`${apiURL}/transfers/wallet/${id}`, {
        purchased: amount,
        action: "+"
      });
      const r = axios.patch(`${apiURL}/transfers/grams/${id}`, {
        grams: grams,
        action: "+"
      })
      const res = axios.post(`${apiURL}/transfers/create`, {
        clientId: id,
        grams: grams,
        amount: amount,
      });

      if (response.status === 200) {
        console.log("Wallet updated successfully");
        this.toast.show("Purchase Successful", 2000);
      }
    } catch (error) {
      console.error("Error: ", error);
      this.toast.show("Purchase Failed", 2000);
    }
  };

  return (
    <ScrollView>
      <View flex-1 center paddingT-42>
        <View paddingB-24 paddingH-12>
          <Text text50 center>
            Buy gold at the best market rate, with ease and trust.
          </Text>
        </View>
        <Card padding-12>
          <Text text60BO marginB-8>
            Current Gold Rate/gm
          </Text>
          <Text text40H center>
            ₹{rate}
          </Text>
        </Card>

        <Card flex-1 center marginT-24 paddingH-12 paddingV-24>
          <View>
            <Text text50 color={theme}>
              Quick purchase
            </Text>
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
              value={grams}
              onChangeText={handleGrams}
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
              value={amount}
              onChangeText={handleAmount}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />
          </View>
          <Button
            label="Purchase"
            backgroundColor={theme}
            marginT-24
            onPress={handlePurchase}
          />
        </Card>
      </View>
      <Toast ref={(toast) => (this.toast = toast)} />
    </ScrollView>
  );
};

export default HomeScreen;
