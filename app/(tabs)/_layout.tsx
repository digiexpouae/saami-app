import { Tabs ,Redirect} from 'expo-router'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const TabLayout = () => {
    return (<>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" , headerShown: false}} >
      

        <Tabs.Screen
          name='home'
          options={{
            title: "Home",
            headerShown:false,
            tabBarIcon: ({ color }) => (
            <FontAwesome name='home' size={28} />

            ),
          }}
        />
        <Tabs.Screen
          name='activity'
          options={{
            title: "Activity",
            headerShown:false,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='pin' color={color} />
            ),
          }}
        />
  <Tabs.Screen
          name='leave'
          options={{
            title: "Leave",
            headerShown:false,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='clock' color={color} />
            ),
          }}
        />
  <Tabs.Screen
          name='holiday'
          options={{
            title: "Holiday List",
            headerShown:false,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='cog' color={color} />
            ),
          }}
        />

      </Tabs>
      </>
    );
}

export default TabLayout;