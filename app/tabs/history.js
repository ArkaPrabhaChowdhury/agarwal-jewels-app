import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import { useFocusEffect, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { apiURL } from "../../utils";
import { theme } from "../styles";
import Loading from "./loading";

const HistoryScreen = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      getTransfers();
    }, [])
  );

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
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headingText}>Grams</Text>
              <Text style={styles.headingTextAmount}>Amount</Text>
              <Text style={styles.headingText}>Rate</Text>
            </View>
            {transfers.map((item, index) => {
              const rate = item.amount / item.grams; // calculate the rate
              return (
                <View key={"row-" + index} style={styles.row}>
                  <Text style={styles.text}>{item?.grams} gms</Text>
                  <View paddingH-4>
                    <Text>{item?.amount} ₹</Text>
                  </View>
                  <View marginL-23>
                    <Text style={styles.text}>{rate.toFixed(2)} ₹/gm</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#C1C0B9",
    paddingVertical: 10,
  },
  text: {
    flex: 2,
    textAlign: "center",
    marginRight: 22,
  },
  headingText: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginRight: 28,
  },
  headingTextAmount: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginRight: 20,
  },
  textAmount: {
    flex: 2,
    textAlign: "center",
    marginHorizontal: 48,
  },
});

export default HistoryScreen;
