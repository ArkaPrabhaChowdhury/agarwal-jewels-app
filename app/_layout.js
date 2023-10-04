import { Stack } from "expo-router/stack";

export default function Layout() {
  return <Stack initialRouteName="home" screenOptions={{headerShown:false,gestureEnabled:false}}/>;
}