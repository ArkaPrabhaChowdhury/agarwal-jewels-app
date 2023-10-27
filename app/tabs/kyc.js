import React, { useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { commonStyles, theme } from "../styles";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native";
import { Image } from "react-native";
import { apiURL } from "../../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Toast from "react-native-toast-message";

const kycScreen = () => {
  //FrontEnd Image Uploading for client
  const [image, setImage] = useState(null);
  const [kyc_num, setKyc_num] = useState("");
  const navigation = useNavigation();

  // KYC Number Upload
  const handleKycNumUpload = async () => {
    const clientId = await AsyncStorage.getItem("userId");
    const url = `${apiURL}/users/${clientId}`;
    const data = {
      kyc_number: kyc_num,
    };
    console.log(data);
    try {
      const response = await axios.patch(url, data);
      console.log("Success:", response.data);
      // Handle success response from server
    } catch (error) {
      console.error("Error:", error);
      // Handle error response from server
    }
  };

  const handleBackButtonPress = () => {
    navigation.navigate("Profile");
    return true;
  };

  const handleKycNum = (text) => {
    setKyc_num(text);
    console.log(text);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload image to server
  const uploadImage = async () => {
    try {
      if (!image) {
        console.log("No image selected.");
        return;
      }
      // Prepare the data to send in the request
      const imageData = {
        kyc_image: image, // Assuming image contains the base64 image data or image URI
        // Other KYC data if needed
      };
      const clientId = await AsyncStorage.getItem("userId");

      const apiUrl = `${apiURL}/users/${clientId}`; // Replace with the user's ID
      const response = await axios.patch(apiUrl, imageData);

      console.log("Image uploaded successfully:", response.data);
      Toast.show({
        type: 'success',
        text1: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      Toast.show({
        type: 'error',
        text1: 'Error uploading image',
      });
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 20 }}
        onPress={handleBackButtonPress}
      >
        <Ionicons name="arrow-back" size={26} color="#333" />
      </TouchableOpacity>
      <View marginT-84 center>
        <Button
          label="Select Image"
          backgroundColor={theme}
          onPress={pickImage}
        />

        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        {image && (
          <Button
            label="Upload Image"
            backgroundColor={theme}
            onPress={uploadImage}
            marginT-12
          />
        )}

        <View marginT-10>
          <TextInput
            style={[
              commonStyles.input,
              {
                marginLeft: 10,
                width: 220,
              },
            ]}
            marginL-20
            placeholder="Enter your Pan/Aadhar number"
            value={kyc_num}
            onChangeText={handleKycNum}
          />
          <Button
            marginT-10
            backgroundColor={theme}
            color="white"
            onPress={handleKycNumUpload}
            label="Submit"
          />
        </View>
      </View>
      <Toast/>
    </View>
  );
};

export default kycScreen;
