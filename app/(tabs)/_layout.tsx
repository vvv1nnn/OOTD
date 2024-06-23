import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dynamic-feed" size={24} color="black" />
          ),
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
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-multiple-plus"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  )
}
