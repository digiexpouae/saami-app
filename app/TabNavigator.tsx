import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import LeaveScreen from '../screens/LeaveScreen';
import HolidayListScreen from '../screens/HolidayListScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Activities') {
            iconName = 'list';
          } else if (route.name === 'Leave') {
            iconName = 'calendar';
          } else if (route.name === 'Holiday List') {
            iconName = 'briefcase';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Leave" component={LeaveScreen} />
      <Tab.Screen name="Holiday List" component={HolidayListScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
