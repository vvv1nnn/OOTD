import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import ProfileName from '@/components/Profile/Username'
import ProfileBio from '@/components/Profile/Bio'
import ProfilePicture from '@/components/Profile/ProfilePicture'
import ProfileWardrobe from '@/components/Profile/Wardrobe'
import React from 'react'

export default function profilePage() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ProfilePicture />
          <ProfileName />
          <ProfileBio />
          <View style={styles.separator} />
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
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  imageContainer: {
    flex: 1,

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
