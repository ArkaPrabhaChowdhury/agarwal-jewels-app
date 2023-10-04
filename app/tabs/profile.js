import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from './profilePage';

const Stack = createNativeStackNavigator();
const Profile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={ProfilePage} options={{headerShown: false,}}/>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 54,
    backgroundColor: "#f5f5f5",
  },
});

export default Profile;
