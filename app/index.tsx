import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@/components/CustomButton'
import { useFonts } from 'expo-font' // Importing expo-font for custom fonts
import { useNavigation } from 'expo-router' // Importing useNavigation from expo-router

export default function App() {
  let [fontsLoaded] = useFonts({
    'TYPOGRAPH-PRO-Semi-Bold': require('../assets/fonts/TYPOGRAPH-PRO-Semi-Bold.ttf'),
  })

  // Using useRef to create Animated.Value
  const fadeAnim = useRef(new Animated.Value(0)).current
  const navigation = useNavigation()

  useEffect(() => {
    // Animation to increase opacity over 3500ms
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start()

    // Navigate to 'login' route after 5000ms (5 seconds)
    const timer = setTimeout(() => {
      // Fade out animation before navigating
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // 1 second duration for fade-out
        useNativeDriver: true,
      }).start(() => {
        // After fade-out animation completes, navigate to 'login' screen
        navigation.push('login')
      })
    }, 5000)

    return () => clearTimeout(timer) // Clear timeout if component unmounts before 5 seconds
  }, [])

  if (!fontsLoaded) {
    return null // Return null while fonts are loading
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
        {/* Use Animated.Text for the text that will be animated */}
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
          OOTD.
        </Animated.Text>
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'TYPOGRAPH-PRO-Semi-Bold',
    fontSize: 80,
    padding: 20,
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
