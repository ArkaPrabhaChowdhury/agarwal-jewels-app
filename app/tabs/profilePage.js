import { useState } from "react";
import { ScrollView } from "react-native";
import { Avatar, Button, Card, Text, View } from "react-native-ui-lib";
import { theme } from "../styles";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+917981047462",
  });

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

      <View marginT-24 center>
        <Button
          label="Edit Profile"
          backgroundColor={theme}
          onPress={() => {
            // Navigate to the edit profile page
          }}
        />
      </View>
    </ScrollView>
  );
};
export default ProfilePage;
