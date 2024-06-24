import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from './feed' // Assuming Feed component is in a separate file
import ProfileScreen from './profile' // Placeholder for profile screen
import CarouselScreen from './carousel' // Placeholder for carousel screen
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 70, // Adjust tab bar height
          borderTopWidth: 0, // Remove top border
          elevation: 0, // Android shadow
          shadowOpacity: 0.1, // iOS shadow
        },
        tabBarIcon: ({ color, size }) => {
          let iconName

          if (route.name === 'Feed') {
            iconName = 'home'
            return <Entypo name={iconName} size={24} color={color} />
          } else if (route.name === 'Profile') {
            iconName = 'person-circle-sharp'
            return <Ionicons name={iconName} size={24} color={color} />
          } else if (route.name === 'Carousel') {
            iconName = 'plus-circle'
            return <Octicons name={iconName} size={24} color={color} />
          }
        },
        tabBarLabel: () => null, // Hide labels
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Carousel" component={CarouselScreen} />
    </Tab.Navigator>
  )
}

export default AppTabs
