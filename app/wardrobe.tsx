import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'

import AddClothingItem from '@/components/Wardrobe/AddItems'
import firebase from '@/firebaseConfig'

export default function Wardrobe() {
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.wardrobe}> WARDROBE </Text>
        <AddClothingItem userId={userId} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  wardrobe: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
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
})
