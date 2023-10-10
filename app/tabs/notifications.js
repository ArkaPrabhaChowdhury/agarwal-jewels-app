import React, { useState, useEffect } from "react";
import { View, Text, Card } from "react-native-ui-lib";
import axios from "axios";
import { apiURL } from "../../utils";
import { ScrollView } from "react-native";


const NotificationsScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${apiURL}/notifications`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}
  >
    <ScrollView>
      {data ? data.map((item, index) => (
        <Card
          key={index}
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 90,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginBottom: 20,
          }}
        >
          <Text>{item.content}</Text>
        </Card>
      ))  : <Text>Loading...</Text>}
    </ScrollView>
  </View>
  );
};

export default NotificationsScreen;
