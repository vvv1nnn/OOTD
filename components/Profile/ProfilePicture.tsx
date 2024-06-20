import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const logo = require('@/assets/images/SADCAT.png')

export default function ProfilePicture() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.circle}>
          <Image source={logo} style={styles.logo} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color of the entire screen
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: -500, // Padding to expand the background color horizontally
  },
  imageContainer: {
    backgroundColor: '#414141', // Background color behind the logo
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%', // Ensure the background color spans the entire screen width
  },
  //this is for the profile picture
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60, // Half of the width and height to make it a circle
    backgroundColor: '#fff', // Background color of the circle (same as container)
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60, // Half of the width and height of the image to make it fit the circle
  },
})
