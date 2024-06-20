import { useState } from 'react'
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
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
    const dbRef = ref(database, `users/${userId}/clothing/${type}`)
    const newItemRef = push(dbRef)
    const newItem: ClothingItem = {
      name: itemName,
      type: type,
      description: description,
      image: image,
    }

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

  const toggleCategory = (category: string) => {
    if (type === category) {
      setType('') // Deselect if the same category is clicked
    } else {
      setType(category) // Select new category
    }
  }

  return (
    <View>
      <Text style={styles.temp}>INSERT IMAGE UPLOADER HERE</Text>
      <TextInput
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        placeholder="Name of item"
        placeholderTextColor="darkgray"
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          marginHorizontal: '10%',
          borderWidth: 1,
          paddingHorizontal: 10,
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
          width: '80%',
          marginHorizontal: '10%',
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      />
      <Text style={styles.category}> Select Item Category </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonWrapper,
            type === 'hats' && styles.selectedButton,
          ]}
          onPress={() => toggleCategory('hats')}
        >
          <Text
            style={[
              styles.buttonText,
              type === 'hats' && styles.selectedButtonText,
            ]}
          >
            Hat
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
            Top
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonWrapper,
            type === 'jackets' && styles.selectedButton,
          ]}
          onPress={() => toggleCategory('jackets')}
        >
          <Text
            style={[
              styles.buttonText,
              type === 'jackets' && styles.selectedButtonText,
            ]}
          >
            Jacket
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
            Bottom
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonWrapper,
            type === 'shoes' && styles.selectedButton,
          ]}
          onPress={() => toggleCategory('shoes')}
        >
          <Text
            style={[
              styles.buttonText,
              type === 'shoes' && styles.selectedButtonText,
            ]}
          >
            Footwear
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
    paddingHorizontal: '25%',
    alignSelf: 'center', // Center the button
  },
  category: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  temp: {
    textAlign: 'center',
    margin: 10,
  },
})
