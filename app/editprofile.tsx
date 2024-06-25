import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import UpdateProfile from '@/components/Profile/UpdateProfile'

import firebase from '@/firebaseConfig'

export default function EditProfile({ navigation }) {
  const [userId, setUserId] = useState('')

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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={styles.profile}> EDIT PROFILE </Text>
          <UpdateProfile userId={userId} />
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
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
    fontWeight: 'bold',
  },
})
