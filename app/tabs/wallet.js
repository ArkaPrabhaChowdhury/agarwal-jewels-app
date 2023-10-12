import React, { useState } from 'react'
import { Button, Card, Text, View } from "react-native-ui-lib";
import { theme } from '../styles';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../../utils';
import { useFocusEffect } from 'expo-router';
const WalletScreen = () => {
  const [balance, setBalance] = useState(0);

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
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  return (
    <ScrollView flex-1 center>
      <Card padding-12 center marginT-24 marginH-18>
        <Text text60BO marginB-8>
          Wallet Balance
        </Text>
        <Text text40H center>
          ₹{balance}
        </Text>
      </Card>

      <View marginT-24 center>
        <Button
          label="View Transaction History"
          backgroundColor={theme}
          onPress={() => {
            // Navigate to the transaction history page
          }}
        />
      </View>
    </ScrollView>
  );
};


export default WalletScreen