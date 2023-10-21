import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { apiURL } from "../../utils";
import { theme } from "../styles";
import Loading from "./loading";
import HistoryCard from "./historyCard";

const HistoryScreen = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTransfers();
  }, []);

  const getTransfers = async () => {
    console.log("getting transfers");
    try {
      const id = await AsyncStorage.getItem("userId");
      console.log(id);
      const res = await axios.post(`${apiURL}/transfers/get`, {
        clientId: id,
      });

      if (res.data) {
        setTransfers(res.data.transfers);
        console.log(res.data.transfers);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after the fetch attempt
    }
  };

  if (loading) {
    return (
      <View center marginT-24>
        <Text>
          <Loading />
        </Text>
      </View>
    );
  }

  if (transfers.length === 0) {
    return (
      <View center marginT-24>
        <Text text50BL>You have no transfers</Text>
        <Button
          label="Buy Gold"
          backgroundColor={theme}
          margin-24
          onPress={() => {
            navigation.navigate("Home");
          }}
        ></Button>
      </View>
    );
  }

  return (
    <ScrollView>
      <View center>
        <View paddingV-40>
          <Text text40R color={theme}>
            Your purchase history
          </Text>
        </View>
        <View style={styles.container}>
          {transfers.map((transfer, index) => (
            <HistoryCard key={index} transfer={transfer} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default HistoryScreen;