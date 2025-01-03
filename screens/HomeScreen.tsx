import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();
   const router = useRouter();

const handleLogout = async () => {
  await AsyncStorage.removeItem('userToken');
  // navigation.reset({
  //   index: 0,
  //   routes: [{ name: 'Login' }],
  // });
  router.push("/Login")
};

  return (
    <View style={styles.container}>
      <Text>Welcome to Home!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
