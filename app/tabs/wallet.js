import React, { useState } from 'react'
import { Button, Card, Text, View } from "react-native-ui-lib";
import { theme } from '../styles';
import { ScrollView } from 'react-native';
const WalletScreen = () => {
  const [balance, setBalance] = useState(1000);

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