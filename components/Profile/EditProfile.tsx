import { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import database from '../../firebaseConfig'
import { ref, push, set, get } from 'firebase/database'

interface UserDetails {
  firstName: string
  email: string
  bio: string
}

export default function EditProfile({ userId }: { userId: string }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    // Fetch existing profile data when component mounts (if needed)
    const dbRef = ref(database, `users/${userId}/profile`)
    // Fetch data from database
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setFirstName(data.firstName || '')
        setEmail(data.email || '')
        setBio(data.bio || '')
      }
    })
  }, [])

  const handleAddItem = () => {
    // Reference to the database path for the user's clothing items under 'tops'
    const dbRef = ref(database, `users/${userId}/profile`)

    // Generate a new key for the new item
    // const newDetailsRef = push(dbRef)

    // Create an object with the new item's data
    const newDetails: UserDetails = {
      firstName: firstName,
      email: email,
      bio: bio,
    }

    // Save the new item to Firebase
    set(dbRef, newDetails)
      .then(() => {
        console.log('Details successfully updated')
        Alert.alert('Success', 'Your details have been updated!')
      })
      .catch((error) => {
        console.error('Error adding clothing item:', error)
        Alert.alert('Error', 'Failed to update details, please try again.')
      })
  }

  return (
    <KeyboardAvoidingView
      behavior={'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 175 : 0}
    >
      <TextInput
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
        placeholderTextColor="darkgray"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="darkgray"
        inputMode="email"
        style={styles.input}
      />
      <TextInput
        value={bio}
        onChangeText={(text) => setBio(text)}
        placeholder="Biography"
        placeholderTextColor="darkgray"
        multiline={true}
        style={{
          height: 100,
          width: 240,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          margin: 10,
        }}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 240,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
  },
})
