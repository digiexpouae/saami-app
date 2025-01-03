
import React from 'react'
import {View,Text, useWindowDimensions} from 'react-native'
import { Image } from 'react-native'
interface Profileprops{
  Img:any;
  name:string;
  id:number;
  designation:string;
  contact:number;
}


const Profile_two:React.FC<Profileprops> = ({Img,name,id,designation,contact}) => {
  const { width } = useWindowDimensions();
  const containerWidth = width * 0.9;
  const imageSize = containerWidth * 0.2;
  return (
    <View className='items-center justify-center'>
    <View style={{width:containerWidth}} className='bg-[red] h-[200px] rounded-[20px] items-center justify-center'>
<Image style={{width:imageSize, height:imageSize}} className='rounded-full 'resizeMode='cover'  source={Img}  />
<Text className='text-[17px] font-extrabold text-white'>{name}</Text>
<View className='flex items-center w-[120px]'><Text className=' text-white'>Employee Id:{id}</Text></View>
<Text className='text-white'>{designation}</Text>
<Text className='text-white'>{contact}</Text>
    </View>
    </View>
  )
}

export default Profile_two;

