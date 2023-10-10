import React, { useState } from "react";
import { ScrollView, Image, Alert } from "react-native";
import { Avatar, Button, Card, Text, View } from "react-native-ui-lib";
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { theme } from "../styles";
import * as ImagePicker from 'expo-image-picker';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+917981047462",
  });

 
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
  
  const uploadImage = () => {
    // Implement image upload logic here
    // You can send the image data to your backend for processing and storage
    // For now, we'll just log the image URI
    console.log('Image URI:', image);
    Alert.alert('Image uploaded successfully!');
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
    </ScrollView>
  );
};

export default ProfilePage;
