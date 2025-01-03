import React from 'react';
import { Text, View } from 'react-native';

interface TableProps {
  overtime: string;  // or number if overtime is numeric
  totalhour: number;
  location: string;   // You can change to more specific type if needed
  day: string | number;  // day can be either string or number
  checkin: string;
  checkout: string;
}

const Table: React.FC<TableProps> = ({ overtime, totalhour, location, day, checkin, checkout }) => {
  return (
    <View className='items-center justify-center${font} bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.7)]'>
      <View className='flex-row gap-[50px] px-3 '>
        <View className="flex-col w-[65px]">
          <Text className='text-gray-500'>OverTime</Text>
          <Text className='text-left'>{overtime}</Text>
        </View>
        <View className="flex-col w-[65px]">
          <Text  className='text-gray-500'>Total Hour</Text>
          <Text className='text-left'>{totalhour}</Text>
        </View>
        <View className="flex-col w-[65px]">
          <Text  className='text-gray-500'>Location</Text>
          <Text className='text-left'>{location}</Text>
        </View>
      </View>

      <View className='flex-row gap-[50px] px-2'>
        <View className="flex-col w-[65px]">
          <Text  className='text-gray-500'>Day</Text>
          <Text  className='text-left'>{day}</Text>
        </View>
        <View className="flex-col w-[65px]">
          <Text  className='text-gray-500'>Check In</Text>
          <Text  className='text-left'>{checkin}</Text>
        </View>
        <View className="flex-col w-[65px]">
          <Text  className='text-gray-500'>Check Out</Text>
          <Text  className='text-left'>{checkout}</Text>
        </View>
      </View>
    </View>
  );
};

export default Table;
