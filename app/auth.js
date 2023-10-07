// Desc: This file contains the navigation for the login and signup pages
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./login";
import SignUpPage from "./signup";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="SignUp" component={SignUpPage} />
    </Stack.Navigator>
  );
}
