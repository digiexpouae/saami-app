import React from 'react'
import { Text, View ,useWindowDimensions} from 'react-native'
import { Image } from 'react-native'
import Profile_box from '../component/Profile_box'
import profile from '../../assets/images/profile.webp'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HorizontalLine from '../component/Horizontal_line'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'; 

const Home = ({any}) => {
   const { width } = useWindowDimensions();
    const containerWidth = width * 0.9;
    const imageSize = containerWidth * 0.3;
    const boxSize=containerWidth*0.2;
    const boxSize_two=containerWidth*0.1;
  return (
  <View className=' px-[10px] py-[35px] bg-white'>
      <StatusBar style="dark"  />
      <View className='flex-row justify-left px-[10px] py-[5px] items-center gap-[80px]'>
     <Profile_box Img={profile} />    <Text className='text-black font-semibold	text-[18px]'>Location</Text>  <FontAwesome size={28} name='bell' />

    </View>
    <View className='flex-row w-[100%] relative items-center'style={{height:imageSize}}>
      <View className='px-4 py-4 ' style={{width:imageSize}}>
        <Text>Check In</Text>
        <Text className='text-[25px] font-semibold'>Time</Text>
        </View> <FontAwesome name='arrow-right' size={14}  style={{width:imageSize}} className="absolute top-[28px] left-[65%]" />
        <View className='bg-red-800 absolute right-[3%] rounded-full' style={{width:boxSize,height:boxSize}}>

</View>
    </View>
    
    <View >
      <View className=' flex-row justify-between px-[10px]'><View className='flex-row  gap-[20px] w-[40%]'> <Text className='bg-red-800 rounded-full ' style={{width:boxSize_two,height:boxSize_two}}></Text> <Text >Break Time</Text>      </View> <Text>1:00 hour</Text>      </View><HorizontalLine />
      <View className=' flex-row justify-between px-[10px]'> <View className='flex-row gap-[20px] w-[40%]'>  <Text className='bg-red-800 rounded-full ' style={{width:boxSize_two,height:boxSize_two}}></Text><Text >Todays Overtime</Text> </View> <Text>1:00 hour</Text>  </View><HorizontalLine />
      <View className=' flex-row justify-between px-[10px]'><View className='flex-row  gap-[20px] w-[40%]'><Text className='bg-red-800 rounded-full  ' style={{width:boxSize_two,height:boxSize_two}}></Text><Text  >Today`s Event</Text>    </View> <Text>1:00 hour</Text>   </View><HorizontalLine />
    </View>
    <View>
      <Text className='text-[20px]'>Announcement</Text>
      <View className='flex-column px-[10px] gap-[10px]'>
      <View className='flex-row justify-between '>
<View className='justify-start items-start'>
<Text className='text-[gray] text-[12px] '> Title</Text><Text>{any='oneday'}</Text>
    </View>
    <Link href={''} className='text-[red]'>See Image</Link></View>
    <View className='justify-start'>
<Text className='text-[gray] text-[12px] '> Description</Text><Text>{any='Explore the best destination in a single day!'}</Text>
    </View>
    <View className='justify-start'>
<Text className='text-[gray] text-[12px]'> Date</Text><Text>{any='12/09/24'}</Text>
    </View>
    </View></View>
    </View>
  )
}

export default Home;
