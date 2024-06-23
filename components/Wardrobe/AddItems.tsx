import React, { useState } from 'react'
import {
  View,
  Image,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import firebase from '../../firebaseConfig'
import * as ImagePicker from 'expo-image-picker'
import {
  ref as databaseRef,
  push,
  set,
  serverTimestamp,
} from 'firebase/database'
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import { router } from 'expo-router'

interface ClothingItem {
  name: string
  type: string
  description: string
  imageUrl: string
  // createdAt: number
}

export default function AddClothingItem({ userId }: { userId: string }) {
  const [itemName, setItemName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [type, setType] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleAddItem = async () => {
    if (!itemName || !description || !type || !image) {
      Alert.alert(
        'Error',
        'Please fill in all the fields and select a category.'
      )
      return
    }

    //Upload Image to Storage Bucket
    setUploading(true)
    const response = await fetch(image)
    const blob = await response.blob()
    const imageRef = storageRef(
      firebase.storage,
      `images/${new Date().toISOString()}`
    )

    await uploadBytes(imageRef, blob)
    const downloadURL = await getDownloadURL(imageRef)

    // Save URL to Firebase Realtime Database
    const newImageRef = push(databaseRef(firebase.database, 'images'))
    await set(newImageRef, {
      url: downloadURL,
      createdAt: serverTimestamp(),
    })

    setUploading(false)
    setImage(null)

    // Reference to the database path for the user's clothing items under 'tops'
    const dbRef = databaseRef(
      firebase.database,
      `users/${userId}/clothing/${type}`
    )
    const newItemRef = push(dbRef)
    const newItem: ClothingItem = {
      name: itemName,
      type: type,
      description: description,
      imageUrl: downloadURL,
      // createdAt: serverTimestamp()
    }

    set(newItemRef, newItem)
      .then(() => {
        console.log('New clothing item added successfully!')
        Alert.alert('Success', 'New clothing item added successfully!')
        setItemName('')
        setDescription('')
        setType('')
      })
      .catch((error) => {
        console.error('Error adding clothing item:', error)
        Alert.alert(
          'Error',
          'Failed to add clothing item. Please try again later.'
        )
      })
  }

  const toggleCategory = (category: string) => {
    if (type === category) {
      setType('') // Deselect if the same category is clicked
    } else {
      setType(category) // Select new category
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      const uri = result.assets[0].uri
      setImage(uri)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {uploading && (
              <Text style={styles.uploadingText}>Uploading...</Text>
            )}
            <TouchableOpacity
              style={styles.selectImageButton}
              onPress={pickImage}
            >
              <Text style={styles.selectImageButtonText}>Select Image</Text>
            </TouchableOpacity>
            <TextInput
              value={itemName}
              onChangeText={(text) => setItemName(text)}
              placeholder="Name of item"
              placeholderTextColor="darkgray"
              style={styles.input}
            />
            <TextInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Enter Description"
              placeholderTextColor="darkgray"
              multiline={true}
              style={styles.textArea}
            />
            <Text style={styles.category}> Select Item Category </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonWrapper,
                  type === 'headwear' && styles.selectedButton,
                ]}
                onPress={() => toggleCategory('headwear')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    type === 'headwear' && styles.selectedButtonText,
                  ]}
                >
                  Headwear
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonWrapper,
                  type === 'accessories' && styles.selectedButton,
                ]}
                onPress={() => toggleCategory('accessories')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    type === 'accessories' && styles.selectedButtonText,
                  ]}
                >
                  Accessories
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonWrapper,
                  type === 'outerwear' && styles.selectedButton,
                ]}
                onPress={() => toggleCategory('outerwear')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    type === 'outerwear' && styles.selectedButtonText,
                  ]}
                >
                  Outerwear
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonWrapper,
                  type === 'tops' && styles.selectedButton,
                ]}
                onPress={() => toggleCategory('tops')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    type === 'tops' && styles.selectedButtonText,
                  ]}
                >
                  Tops
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonWrapper,
                  type === 'bottoms' && styles.selectedButton,
                ]}
                onPress={() => toggleCategory('bottoms')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    type === 'bottoms' && styles.selectedButtonText,
                  ]}
                >
                  Bottoms
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonWrapper,
                  type === 'footwear' && styles.selectedButton,
                ]}
                onPress={() => toggleCategory('footwear')}
              >
                <Text
                  style={[
                    styles.buttonText,
                    type === 'footwear' && styles.selectedButtonText,
                  ]}
                >
                  Footwear
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddItem}
              disabled={uploading}
            >
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push('/profile')} // Navigate back to ProfilePage
            >
              <Text style={styles.addButtonText}>Back to Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    marginHorizontal: '10%',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  textArea: {
    height: 100,
    width: '80%',
    marginHorizontal: '10%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  category: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    paddingVertical: 10,
    alignSelf: 'center', // Center the button
    backgroundColor: 'black',
    minWidth: '50%', // Ensure both buttons are of same width
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectImageButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: '15%',
    backgroundColor: 'black',
  },
  selectImageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  uploadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
})
