import { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  StyleSheet,
  Image,
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

interface ClothingItem {
  name: string
  type: string
  description: string
  imageUrl: string
}

export default function AddClothingItem({ userId }: { userId: string }) {
  const [itemName, setItemName] = useState('')
  const [description, setColor] = useState('')
  const [image, setImage] = useState(null)
  const [type, setType] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleAddItem = async () => {
    if (!image) return

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

    // Generate a new key for the new item
    const newItemRef = push(dbRef)

    // Create an object with the new item's data
    const newItem: ClothingItem = {
      name: itemName,
      type: type,
      description: description,
      imageUrl: downloadURL,
    }

    // Save the new item to Firebase
    set(newItemRef, newItem)
      .then(() => {
        console.log('New clothing item added successfully!')
        Alert.alert('Success', 'New clothing item added successfully!')
        setItemName('')
        setColor('')
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

  // Pick an image from device
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setImage(uri as any)
    }
  }

  // Upload Image to Storage Bucket
  const uploadImage = async () => {}

  return (
    <View>
      <TextInput
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        placeholder="Enter item name"
        placeholderTextColor="darkgray"
        style={{
          height: 40,
          width: 220,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          margin: 10,
        }}
      />
      <TextInput
        value={description}
        onChangeText={(text) => setColor(text)}
        placeholder="Enter Description"
        placeholderTextColor="darkgray"
        multiline={true}
        style={{
          height: 100,
          width: 220,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          margin: 10,
        }}
      />
      <Text> {type} </Text>
      <View>
        <Button title="Hat" onPress={() => setType('hats')} />
        <Button title="Top" onPress={() => setType('tops')} />
        <Button title="Jacket" onPress={() => setType('jackets')} />
        <Button title="Bottom" onPress={() => setType('bottoms')} />
        <Button title="Shoes" onPress={() => setType('shoes')} />
      </View>

      <View style={styles.container}>
        <Button title="Pick an image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {uploading && <Text style={styles.uploadingText}>Uploading...</Text>}
      </View>
      <Button title="Add Item" onPress={handleAddItem} disabled={uploading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
