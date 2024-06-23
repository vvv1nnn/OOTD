import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { useRouter } from 'expo-router'
import ProfileName from '@/components/Profile/Username'
import ProfileBio from '@/components/Profile/Bio'
import ProfilePicture from '@/components/Profile/ProfilePicture'
import ProfileWardrobe from '@/components/Profile/Wardrobe'

import ShowUserProfile from '@/components/Profile/UserProfile'


export default function ProfilePage() {
  const router = useRouter()

  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/editprofile')}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.separator]} />
        <View style={styles.profileContainer}>
          <ProfilePicture />

        <View style={styles.imageContainer}>
          {/* <ProfilePicture />

          <ProfileName />
          <ProfileBio /> */}
          <ShowUserProfile />
          <View style={styles.separator} />
          <ProfileWardrobe />

          <View style={styles.separator} />
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
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#333', // Change to a darker color for better contrast
    width: '100%', // Slightly reduce width to account for padding
    marginBottom: 5,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%', // Ensure full width for the profile container
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
})
