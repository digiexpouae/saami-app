import React from 'react'
import { Text, View } from 'react-native'
import Profile_two from '../componenets/Profile_two'
import profile from '../../assets/images/profile.webp' // Specify the image path correctly
const Profile = () => {
  return (
      <View>
  <Profile_two  Img={profile} name='Profile' id={1234} designation='react' contact={1234567} />
   </View>
  )
}

export default Profile;