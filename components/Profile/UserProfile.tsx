import { View, Text, StyleSheet } from 'react-native'
import { ref, child, onValue, DataSnapshot } from 'firebase/database'
import firebase from '@/firebaseConfig'
import { useState, useEffect } from 'react'

import ProfilePicture from '@/components/Profile/ProfilePicture'

export default function ShowUserProfile() {
  const [profileData, setProfileData] = useState<any>(null) // Adjust type as needed

  useEffect(() => {
    const fetchUserProfile = () => {
      const userRef = ref(firebase.database, 'users/vin/profile')

      onValue(
        userRef,
        (snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            setProfileData(snapshot.val())
          } else {
            setProfileData(null) // Handle case where profile data does not exist
          }
        },
        (error) => {
          console.error('Error fetching user profile:', error)
          setProfileData(null) // Set profileData to null in case of error
        }
      )

      // Clean up listener on unmount
      return () => {
        onValue(userRef, null as any) // Unsubscribe from the listener
      }
    }

    // Fetch the user profile data
    fetchUserProfile()
  }, [])

  return (
    <>
      {profileData !== null ? (
        <>
          <ProfilePicture />
          <Text style={styles.username}>vvv1nnn</Text>
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
