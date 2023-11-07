import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
const Contact = () => {
  return (
    <ScrollView contentContainerStyle ={styles.container}>
      <Text text50 marginB-10>
        What is this App about?
      </Text>
      <Text marginB-10>
        Agrawaj Jewellers App' is a platform which facilitates purchase of
        physical bullion (i.e. Gold/Silver) in smaller denominations, with the
        ease of online access. The customer can visit Agrawal Jewellers' Store
        at Vidisha and purchase Gold/Silver Jewellery/Coins against the
        Gold/Silver purchased from the App anytime they want. Customers can also
        sell the bullion (bought from us) in a secured and convenient manner
        back to Ashok Agrawal Jewellers.
      </Text>
      <Text marginB-10 text50>
        What is the benefit of purchasing Gold/Silver / Platinum from Agrawal
        Jewellers App?
      </Text>
      <Text>
        1- Convenience of buying from anywhere you are, using your Hand-Held
        device
      </Text>
      <Text>2-Flexibility of Buying Small Quantities</Text>
      <Text>
        3-Agrawal Jewellers ensures better pricing than prevailing Market Prices
      </Text>
      <Text>
        4-Option of Buying Jewellery - The customers can come to our store and
        Buy Jewellery / Coins against the Gold/ Silver bought from this App
      </Text>
      <Text>
        5- Customer can also sell back the Gold/Silver bought using our App and
        get the money in their bank account.
      </Text>
      <Text>
        6-Passbook - The Passbook Feature makes your record keeping very
        convenient and handy
      </Text>
      <Text marginB-10>
        7- No additional Cost of maintenance and operating your account
      </Text>
      <Text marginB-10 text50>
        What time of the day can I buy Gold/Silver using your App?
      </Text>
      <Text marginB-10>
        Agrawal Jewellers App is operational on all days of week 24/7 throughout
        the year.
      </Text>
      <Text text50 marginB-10>
        How can I make the payment to purchase Gold/Silver using your App ?
      </Text>
      <Text marginB-10>
        Customers can make the payment using Payment Gateway mechanism which
        supports Net Banking, UPI & Debit Cards.
      </Text>
      <Text marginB-10 text50>
        How can a customer 'Buy' on Agrawal Jewellers App?
      </Text>
      <Text marginB-10>
        A customer can select the metal they want to "Buy" and then enter the
        Quantity/Amount of Metal they wish to "Buy" after selecting the Metal
        and entering the Quantity they customer can select Buy Now and make the
        payment using the allowed instruments/methods of payments
      </Text>
      <Text marginB-10 text50>
        Can a customer 'Sell-Back' on Agrawal Jewellers App?
      </Text>
      <Text marginB-10>
        Yes, A customer can click on the 'Sell and then select the Metal they
        wish to sell and then enter the quantity of metal they wish to sell from
        the available quantity they have bought using the App held in the
        secured vault by Agrawal Jewellers' on Customer's behalf. The amount
        will we credited in customer bank account after 3 working days.
      </Text>
      <Text marginB-10 text50>
        Can I Buy Jewellery from the Gold/Silver bought using Agrawal Jewellers
        App ?
      </Text>
      <Text marginB-10>
        Yes, A customer can visit our Store and buy Jewellery against the Metal
        help in their account/App.
      </Text>
      <Text marginB-10 text50>
        Can I Start SIP with Agrawal Jewellers using this App
      </Text>
      <Text marginB-10>
        Yes, You can start a Monthly SIP for the available metals i.e.
        Gold/Silver / Platinum with the convenient small amounts.
      </Text>
      <Text marginB-10 text50>
        Is GST and Making Charges applicable on my Purchases?
      </Text>
      <Text marginB-10>
        Yes, Current Purchase is consider as an advance against your final
        product Purchase, Hence GST and Making Charges will be levied on the
        final Product and not on current advance.
      </Text>
      <Text marginB-10 text50>
        Where is Agrawal Jewellers' Physical Store ?
      </Text>
      <Text marginB-10>Agrawal Jewellers, Kagdi Pura, Tilak Chowk, Vidisha 464001</Text>
      <Text marginB-10 text50>
        How do I take the delivery of the Gold/Silver accumulated on this app?
      </Text>
      <Text marginB-10>
        You're welcome to our store and choose from the wide variety of options
        we provide, you can also place an order for jewellery.
      </Text>
      <Text marginB-10 text50>
        How do I cancel my order?
      </Text >
      <Text >Orders once placed cannot be cancelled.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container:{
        padding:40
    }
})

export default Contact;
