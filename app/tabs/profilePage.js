import React, { useEffect, useState } from "react";
import { ScrollView, Image, Alert } from "react-native";
import { Avatar, Button, Card, Text, View } from "react-native-ui-lib";
import { launchImageLibrary } from "react-native-image-picker"; // Import image picker
import { commonStyles, theme } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect, useNavigation } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { apiURL } from "../../utils";
import Loading from "./loading";

const ProfilePage = () => {
  //Setting Up The Kyc Number, plis dont scold for naming ps. code at line 126

  const [image, setImage] = useState(null);
  const [kycDone, setKycDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  //Async Storage for clientID
  useFocusEffect(
    React.useCallback(() => {
      getUser();
      getId();
      return () => {};
    }, [])
  );

  //Profile Data for client
  const [clientId, setClientId] = useState("");
  const [user, setUser] = useState({
    email: "",
    phone: "",
  });
  const getId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      setClientId(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKYC = () => {
    navigation.navigate("tabs/kyc");
  };

  //Getting User Details
  const getUser = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      const response = await axios.get(`${apiURL}/users/${id}`);
      console.log(response.data.kyc_image);
      if (response.data.kyc_image) {
        setKycDone(true);
      }
      setUser((prevUser) => ({
        ...prevUser,
        email: response.data.email,
        phone: response.data.phonenumber,
      }));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      navigation.navigate("login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View center>
        {loading ? (
          <View center>
            <Loading />
          </View>
        ) : (
          <Card padding-12 paddingH-24 center margin-24>
            <Text text60BO marginB-8>
              Your details
            </Text>

            <Text text40H color={theme}>
              {user.email}
            </Text>

            <Text text40H marginT-12 color={theme} marginB-12>
              {user.phone}
            </Text>
          </Card>
        )}

        {image && !loading && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        {!kycDone && !loading && (
          <View marginT-24 center>
            <Button
              label="Complete KYC"
              backgroundColor={theme}
              onPress={handleKYC}
            />
          </View>
        )}

        {!loading && (
          <Button
            label="Log out"
            backgroundColor={theme}
            marginT-24
            onPress={handleLogout}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
