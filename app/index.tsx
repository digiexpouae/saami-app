import { Text, View } from "react-native";
import '../global.css'
import { Redirect } from "expo-router";
const Index = () => {
  return <Redirect href={"/(tabs)/Home"}  />;
};

export default Index;
