import React from 'react'
import { Text, View } from 'react-native'
import Table from '../componenets/Table' ;
import Button from '../componenets/Button';
const Home = () => {
  return (
<View>
      <Table
        overtime="2 hours"
        totalhour={8}
        location="Office"
        day="Monday"
        checkin="9:00 AM"
        checkout="5:00 PM"
      />

      <View className='bg-[red] h-[50px] w-[50px] rounded-full items-center justify-center '>
     
        <Button Text1='CheckIn' Text2='Checkout'/>
      </View>
    
    </View>
  )
}

export default Home