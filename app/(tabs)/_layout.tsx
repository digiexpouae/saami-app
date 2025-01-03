import { Tabs ,Redirect} from 'expo-router'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const TabLayout = () => {
    return (<>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" , headerShown: false}} >
      

        <Tabs.Screen
          name='home'
          options={{
            title: "Home",
            headerShown:false,
            tabBarIcon: ({ color }) => (
            <FontAwesome  name='home' size={28} />

            ),
          }}
        />
        <Tabs.Screen
          name='activity'
          options={{
            title: "Activity",
            headerShown:false,
            tabBarIcon: ({ color }) => (
              <FontAwesome  size={28} name='key' color={color} />
            ),
          }}
        />
  <Tabs.Screen
          name='leave'
          options={{
            title: "Leave",
            headerShown:false,
            tabBarIcon: ({ color }) => (
              <FontAwesome  size={28} name='map' color={color} />
            ),
          }}
        />
  <Tabs.Screen
          name='holiday'
          options={{
            title: "Holiday List",
            headerShown:false,
            tabBarIcon: ({ color }) => (
              <FontAwesome  size={28} name='table' color={color} />
            ),
          }}
        />

      </Tabs>
      </>
    );
}

export default TabLayout;