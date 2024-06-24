import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
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
        name="carousel"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="plus-circle" size={24} color="black" />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="wardrobe"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dresser-outline"
              size={24}
              color="black"
            />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="editprofile"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-pen" size={24} color="black" />
          ),
        }}
      /> */}
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
