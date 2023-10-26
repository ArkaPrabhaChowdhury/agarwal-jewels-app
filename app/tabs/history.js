import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { apiURL } from "../../utils";
import { theme } from "../styles";
import Loading from "./loading";

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
            <View key={index} style={styles.card}>
              <Text style={styles.label}>Grams: {transfer.grams}</Text>
              <Text style={styles.label}>Amount: {transfer.amount}</Text>
              <Text style={styles.label}>Rate: {transfer.amount/transfer.grams}</Text>
              <Text style={styles.label}>
              Time: {new Date(transfer.createdAt).toLocaleDateString("en-GB")}
              </Text>
            </View>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default HistoryScreen;