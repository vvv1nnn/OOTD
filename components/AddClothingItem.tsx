import { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import database from '../firebaseConfig'
import { ref, push, set } from 'firebase/database'

interface ClothingItem {
  name: string
  color: string
  size: string
}

export default function AddClothingItem({ userId }: { userId: string }) {
  const [itemName, setItemName] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')

  const handleAddItem = () => {
    // Reference to the database path for the user's clothing items under 'tops'
    const dbRef = ref(database, `users/${userId}/clothing/tops`)

    // Generate a new key for the new item
    const newItemRef = push(dbRef)

    // Create an object with the new item's data
    const newItem: ClothingItem = {
      name: itemName,
      color: color,
      size: size,
    }

    // Save the new item to Firebase
    set(newItemRef, newItem)
      .then(() => {
        console.log('New clothing item added successfully!')
        Alert.alert('Success', 'New clothing item added successfully!')
        setItemName('')
        setColor('')
        setSize('')
      })
      .catch((error) => {
        console.error('Error adding clothing item:', error)
        Alert.alert(
          'Error',
          'Failed to add clothing item. Please try again later.'
        )
      })
  }

  return (
    <View>
      <TextInput
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        placeholder="Enter item name"
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          margin: 10,
        }}
      />
      <TextInput
        value={color}
        onChangeText={(text) => setColor(text)}
        placeholder="Enter color"
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          margin: 10,
        }}
      />
      <TextInput
        value={size}
        onChangeText={(text) => setSize(text)}
        placeholder="Enter size"
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          margin: 10,
        }}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  )
}
