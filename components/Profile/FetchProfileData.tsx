import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { ref, child, onValue } from 'firebase/database'
import firebase from '@/firebaseConfig'
import ProfileName from './Username'
import ProfileBio from './Bio'

export default function FetchProfileData() {
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    const fetchUserProfile = () => {
      // Reference to the 'users/vin/profile' path in Firebase Realtime Database
      const userRef = ref(firebase.database, 'users/vin/profile')

      // Listen for changes to the user's profile data
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setProfileData(snapshot.val())
        } else {
          setProfileData(null) // Handle case where user data does not exist
        }
      })
    }

    // Fetch the user profile data
    fetchUserProfile()

    // Clean up listener on unmount
    return () => {
      // Unsubscribe from the user profile data listener
      const userRef = ref(firebase.database, 'users/vin/profile')
      onValue(userRef, null)
    }
  }, [])

  return (
    <View>
      {profileData ? (
        <View>
          <ProfileName />
        </View>
      ) : (
        <Text>Loading profile...</Text>
      )}
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   profileContainer: {
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// })
