import { View, Text, StyleSheet, Alert } from 'react-native'
import { ref, child, onValue, DataSnapshot, get, set } from 'firebase/database'
import firebase from '@/firebaseConfig'
import { useState, useEffect } from 'react'

import ProfilePicture from '@/components/Profile/ProfilePicture'

export default function ShowUserProfile() {
  const [profileData, setProfileData] = useState<any>(null) // Adjust type as needed
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Fetch the current user
    const currentUser = firebase.auth.currentUser

    if (currentUser) {
      // Set the user ID
      setUserId(currentUser.displayName as string)
    } else {
      // Handle the case where the user is not logged in
      Alert.alert('Authentication Error', 'No user is logged in')
    }
  }, [])

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return // Return if userId is not set

      const userRef = ref(firebase.database, `users/${userId}/profile`)

      try {
        // Check if the profile exists
        const snapshot = await get(userRef)
        if (snapshot.exists()) {
          // If profile exists, set it to the state
          setProfileData(snapshot.val())
        } else {
          // If profile does not exist, create it with default data
          const defaultProfile = {
            firstName: 'Default Name',
            bio: 'This is a default bio.',
          }
          await set(userRef, defaultProfile)
          setProfileData(defaultProfile)
        }
      } catch (error) {
        console.error('Error fetching or creating user profile:', error)
        setProfileData(null) // Set profileData to null in case of error
      } finally {
        setLoading(false) // Update loading state
      }
    }

    // Fetch the user profile data
    fetchUserProfile()
  }, [userId])

  return (
    <>
      {profileData !== null ? (
        <>
          <ProfilePicture />
          <Text style={styles.username}>{userId}</Text>
          <Text style={styles.bio}>{profileData.firstName}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>
        </>
      ) : (
        <Text>Loading Profile...</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  username: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 20,
  },
  bio: {
    textAlign: 'center',
    margin: 10,
  },
})
