import React, { useEffect, useState } from "react";
import { ScrollView, Image, Alert } from "react-native";
import { Avatar, Button, Card, Text, View } from "react-native-ui-lib";
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { theme } from "../styles";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useFocusEffect } from "expo-router";
import Toast from "react-native-easy-toast";  


const ProfilePage = () => {

  useFocusEffect(
    React.useCallback(() => {
      getId();
      return () => {};
    }, [])
  );

  
  const [clientId, setClientId] = useState("");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+917981047462",
  });

  const getId = async() => {
    try{
      const id = await AsyncStorage.getItem("userId");
      setClientId(id);
    }
    catch(err){
      console.log(err);
    }
  }
 
    const [image, setImage] = useState(null);
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
  

    const uploadImage = async () => {
      try {
        if (!image) {
          console.log('No image selected.');
          return;
        }
        // Prepare the data to send in the request
        const imageData = {
          kyc_image: image,  // Assuming image contains the base64 image data or image URI
          // Other KYC data if needed
        };
        // Replace 'YOUR_BACKEND_API_URL' with the actual URL where your backend is hosted
        const apiUrl = `http://localhost:2000/users/${clientId}`; // Replace with the user's ID
        const response = await axios.patch(apiUrl, imageData);
    
        console.log('Image uploaded successfully:', response.data);
        this.toast.show("Image uploaded successfully!")
        
      } catch (error) {
        console.error('Error uploading image:', error);
        this.toast.show('Error uploading image. Please try again.');
        
      }
    };
    
  

  return (
    <ScrollView flex-1 center>
      <Card padding-12 center>
        <Text text40 marginT-8 marginB-8>
          {user.name}
        </Text>
        <Text text40H color={theme}>
          {user.email}
        </Text>
        <Text text40H marginT-12 color={theme} marginB-12>
          {user.phone}
        </Text>

      </Card>

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      
      <View marginT-24 center>
        <Button
          label="Select Image"
          backgroundColor={theme}
          onPress={pickImage}
        />
        {image && (
          <Button
            label="Upload Image"
            backgroundColor={theme}
            onPress={uploadImage}
            marginT-12
          />
          
        )}
        
      </View>
      <Toast ref={(toast) => (this.toast = toast)} />
    </ScrollView>
  );
};

export default ProfilePage;
