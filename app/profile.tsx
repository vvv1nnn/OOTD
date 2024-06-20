import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import ProfileName from '../components/Profile/Username.tsx'
import ProfileBio from '../components/Profile/Bio.tsx'
import ProfilePicture from '../components/Profile/ProfilePicture.tsx'
import ProfileWardrobe from '../components/Profile/Wardrobe.tsx'
import React from 'react'

export default function profilePage() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ProfilePicture />
          <ProfileName />
          <ProfileBio />
          <ProfileWardrobe />
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    marginTop: 10,
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  profile: {
    textAlign: 'center',
  },
  bio: {
    textAlign: 'center',
  },
})
