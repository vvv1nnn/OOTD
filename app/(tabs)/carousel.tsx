import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import {
  ref as databaseRef,
  push,
  set,
  serverTimestamp,
} from 'firebase/database'
import firebase from '@/firebaseConfig'

import ShuffleButton from '@/components/ShuffleButton'
import SaveButton from '@/components/SaveButton'
import DisplayClothes from '@/components/Carousel/DisplayClothing'

const logo = require('@/assets/images/ootd.png')

export default function App() {
  const viewShotRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const username = 'vin' //placeholder until auth is implemented

  const captureAndUpload = async () => {
    if (!viewShotRef.current) return

    setUploading(true)

    try {
      // Capture the screenshot
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
      })

      const response = await fetch(uri)
      const blob = await response.blob()

      // Upload the screenshot to Firebase Storage
      const imageRef = storageRef(
        firebase.storage,
        `posts/${new Date().toISOString()}.png`
      )
      await uploadBytes(imageRef, blob)
      const downloadURL = await getDownloadURL(imageRef)

      // Save post data to Firebase Realtime Database
      const newPostRef = push(databaseRef(firebase.database, 'posts'))
      await set(newPostRef, {
        imageUrl: downloadURL,
        username,
        createdAt: serverTimestamp(),
        likes: 0,
      }).then(() => Alert.alert('Success', 'Post uploaded successfully!'))
    } catch (error) {
      console.error('Error capturing and uploading screenshot: ', error)
      Alert.alert('Error', 'Failed to post. Please try again later.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.imageContainer2}>
          <Text style={styles.text}>OOTD.</Text>
        </View>
        <ViewShot ref={viewShotRef} style={styles.container}>
          <Text style={styles.sectionHeader}>Headwear</Text>
          <DisplayClothes clothingType="headwear" />
          <Text style={styles.sectionHeader}>Accessories</Text>
          <DisplayClothes clothingType="accessories" />
          <Text style={styles.sectionHeader}>Outerwear</Text>
          <DisplayClothes clothingType="outerwear" />
          <Text style={styles.sectionHeader}>Tops</Text>
          <DisplayClothes clothingType="tops" />
          <Text style={styles.sectionHeader}>Bottoms</Text>
          <DisplayClothes clothingType="bottoms" />
          <Text style={styles.sectionHeader}>Footwear</Text>
          <DisplayClothes clothingType="footwear" />
        </ViewShot>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Shuffle</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={captureAndUpload}
            disabled={uploading}
          >
            <Text style={styles.addButtonText}>
              {uploading ? 'Uploading...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const buttonSize = 200 // Adjust this value for desired button size

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'TYPOGRAPH-PRO-Semi-Bold',
    fontSize: 50,
    paddingTop: 10,

    top: 0,
    left: 0,
  },
  imageContainer2: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    width: buttonSize,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  addButton: {
    width: '100%',
    height: 40, // Adjust this value for desired button height
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
})
