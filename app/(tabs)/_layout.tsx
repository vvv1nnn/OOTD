import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
          tabBarStyle: {
            height: 50, // Adjust height as needed
            paddingBottom: 5,
            paddingTop: 5,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-sharp" size={24} color="black" />
          ),
          tabBarStyle: {
            height: 50,
            paddingBottom: 5,
            paddingTop: 5,
          },
        }}
      />
      <Tabs.Screen
        name="carousel"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="plus-circle" size={24} color="black" />
          ),
          tabBarStyle: {
            height: 50,
            paddingBottom: 5,
            paddingTop: 5,
          },
        }}
      />
    </Tabs>
  )
}
