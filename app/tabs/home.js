import { Button, Card, TextField, View } from "react-native-ui-lib";
import Text from "react-native-ui-lib/text";
import { commonStyles, theme } from "../styles";
import { ScrollView, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { apiURL } from "../../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import Loading from "./loading";
import Toast from "react-native-easy-toast";

const HomeScreen = () => {
  const [rate, setRate] = useState("0000");
  const [buyGrams, setBuyGrams] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(true);
  const toastRef = useRef(null);

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

  const handleBuyGrams = (text) => {
    setBuyGrams(text);
    const convertedAmount = text ? parseFloat(text) * rate : 0; // Set to 0 if empty
    setBuyAmount(convertedAmount.toFixed(2));
  };

  const handleBuyAmount = (text) => {
    setBuyAmount(text);
    const convertedAmount = text ? parseFloat(text) / rate : 0; // Set to 0 if empty
    setBuyGrams(convertedAmount.toFixed(2));
  };

  const getId = async () => {
    const id = await AsyncStorage.getItem("userId");
    setClientId(id);
    console.log(id);
  };

  const handlePurchase = async () => {
    showToast("Wallet updated successfully");
    try {
      const id = await AsyncStorage.getItem("userId"); // Replace with the actual user ID
      const response = axios.patch(`${apiURL}/transfers/wallet/${id}`, {
        purchased: buyAmount,
        action: "+",
      });
      axios
        .post(`${apiURL}/transfers/create`, {
          clientId: id,
          grams: buyGrams,
          amount: buyAmount,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log("Wallet updated successfully");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //
  const handleUPI = async () => {
    var data = JSON.stringify({
      key: "109edfed-6ff4-4fe0-b3f9-6673a509e368",
      client_txn_id: "23456789",
      amount: "100",
      p_info: "Product Name",
      customer_name: "Jon Doe",
      customer_email: "jondoe@gmail.com",
      customer_mobile: "9876543210",
      redirect_url: "http://google.com",
      udf1: "user defined field 1",
      udf2: "user defined field 2",
      udf3: "user defined field 3",
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.ekqr.in/api/create_order",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        Linking.openURL(response.data.payment_url);
      })
      .catch(function (error) {
        console.log(error);
      });
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
              value={buyGrams}
              onChangeText={handleBuyGrams}
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
              value={buyAmount}
              onChangeText={handleBuyAmount}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />
          </View>
          <Button
            label="Purchase"
            backgroundColor={theme}
            marginT-24
            onPress={handleUPI}
          />
        </Card>
      </View>
      <Toast ref={toastRef} />
    </ScrollView>
  );
};

export default HomeScreen;
