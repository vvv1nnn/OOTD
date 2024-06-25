import React from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import ProfileWardrobe from '@/components/Profile/Wardrobe'
import ShowUserProfile from '@/components/Profile/UserProfile'

export default function ProfilePage() {
  const router = useRouter()

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <ShowUserProfile />
          <View style={styles.buttonContainer2}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/editprofile')}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <ProfileWardrobe />

          <View style={styles.separator} />
        </View>
        <StatusBar style="auto" />
        <View style={styles.buttonContainer2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '47%',
    marginBottom: 10,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    height: 27,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: 'black', // Change to a darker color for better contrast
    width: '100%', // Slightly reduce width to account for padding
    marginTop: 5,
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
