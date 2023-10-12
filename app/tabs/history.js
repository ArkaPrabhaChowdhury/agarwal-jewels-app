import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Card, Text, View } from "react-native-ui-lib";
import { commonStyles, theme } from "../styles";
import { useFocusEffect } from "expo-router";
import { apiURL } from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const transactions = [
  { id: 1, date: "2021-09-01", amount: 100 },
  { id: 2, date: "2021-09-02", amount: 200 },
  { id: 3, date: "2021-09-03", amount: 300 },
  { id: 4, date: "2021-09-04", amount: 400 },
  { id: 5, date: "2021-09-05", amount: 500 },
];

const HistoryScreen = () => {
  const [transfers, setTransfers] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getTransfers();
    }, [])
  );

  const getTransfers = async () => {
    console.log("getting transfers");
    const id = await AsyncStorage.getItem("userId");
    console.log(id);
    axios
      .post(`${apiURL}/transfers/get`, {
        clientId: id,
      })
      .then((res) => {
        if (res.data) {
          setTransfers(res.data.transfers);
          console.log(res.data.transfers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View center>
      <View paddingV-40>
        <Text text40R color={theme}>
          Your purchase history
        </Text>
      </View>
      {transfers.length > 0 ? (
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
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
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
