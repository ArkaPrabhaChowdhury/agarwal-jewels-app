import View from "react-native-ui-lib/view";
import Text from "react-native-ui-lib/text";
import Button from "react-native-ui-lib/button";
import { useNavigation } from "expo-router";

const HomePage = () => {
  const navigation=useNavigation()
  
  const handlePress = () => {
    navigation.navigate("auth")
  }
  return (
    <View flex center>
      <Text text50 marginB-20>Welcome to Agarwal jewellers!</Text>
      <Button label="Welcome" backgroundColor="black" onPress={handlePress} />
    </View>
  );
};

export default HomePage;
