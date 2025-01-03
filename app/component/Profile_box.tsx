import React from 'react'
import {View,Text, useWindowDimensions} from 'react-native'
import { Image } from 'react-native'
interface Profileprops{
  Img:any;

}
const Profile_two:React.FC<Profileprops> = ({Img}) => {
  const { width } = useWindowDimensions();
  const containerWidth = width * 0.9;
  const imageSize = containerWidth * 0.2;
  return (
    <View>

<Image style={{width:imageSize, height:imageSize}} className='rounded-full border-4 border-red-500'resizeMode='cover'  source={Img}  />


    </View>
  )
}
export default Profile_two;