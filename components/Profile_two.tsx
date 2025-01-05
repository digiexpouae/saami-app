import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import ProfileCard from "@/components/Profile_two";

const Profile = ({ name, role }) => {
  return (
    <>
      <Card mode='elevated' style={styles.root}>
        <Text variant='titleLarge' className='text-white'>
          {" "}
          {name}
        </Text>
        <Text variant='titleLarge'>{role}</Text>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
