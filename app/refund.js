
import React from 'react';
import { View, Text } from 'react-native';

const RefundPage = () => {
  return (
    <View style={{
        padding:42
    }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Returns & Refund</Text>
      <Text style={{ marginTop: 10 }}>1. Refunds in case of failed orders:</Text>
      <Text style={{ marginLeft: 10 }}>In case the money is debited and order is failed, the refund of such failed orders will be completed in 7 working days.</Text>
      <Text style={{ marginTop: 10 }}>2. Shipping Policy:</Text>
      <Text style={{ marginLeft: 10 }}>The customer needs to visit the store to redeem the bullion/metal accumulated using this app and the same will be delivered to the customer anywhere outside the store.</Text>
      <Text style={{ marginTop: 10 }}>3. Cancellation Policy:</Text>
      <Text style={{ marginLeft: 10 }}>The orders executed cannot be cancelled.</Text>
    </View>
  );
};

export default RefundPage;
