import { useState } from 'react'
import { View, TextInput, Button, Alert, Text } from 'react-native'
import database from '../../firebaseConfig'
import { ref, push, set } from 'firebase/database'

interface ClothingItem {
  name: string
  type: string
  description: string
  image: string
}

export default function AddClothingItem({ userId }: { userId: string }) {
  const [itemName, setItemName] = useState('')
  const [description, setColor] = useState('')
  const [image, setImage] = useState('')
  const [type, setType] = useState('')

  const handleAddItem = () => {
    // Reference to the database path for the user's clothing items under 'tops'
    const dbRef = ref(database, `users/${userId}/clothing/${type}`)

    // Generate a new key for the new item
    const newItemRef = push(dbRef)

    // Create an object with the new item's data
    const newItem: ClothingItem = {
      name: itemName,
      type: type,
      description: description,
      image: image,
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

      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  )
}
