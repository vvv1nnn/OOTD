import React from 'react'
import { ScrollView, StyleSheet, View, Button } from 'react-native'
import { useRouter } from 'expo-router'
import ProfileName from '@/components/Profile/Username'
import ProfileBio from '@/components/Profile/Bio'
import ProfilePicture from '@/components/Profile/ProfilePicture'
import ProfileWardrobe from '@/components/Profile/Wardrobe'

export default function ProfilePage() {
  const router = useRouter()

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Button
            title="Edit Profile"
            onPress={() => router.push('/editprofile')} // Navigation using expo-router
          />
          <Button title="Logout" />
          <ProfilePicture />
          <ProfileName />
          <ProfileBio />
          <View style={styles.separator} />
          <ProfileWardrobe />
        </View>
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
})
