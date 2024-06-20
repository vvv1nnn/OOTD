import { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native'
import database from '../../firebaseConfig'
import { ref, set, get } from 'firebase/database'

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
    const dbRef = ref(database, `users/${userId}/profile`)
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setFirstName(data.firstName || '')
        setEmail(data.email || '')
        setBio(data.bio || '')
      }
    })
  }, [userId])

  const handleSubmit = () => {
    const dbRef = ref(database, `users/${userId}/profile`)

    const newDetails: UserDetails = {
      firstName: firstName,
      email: email,
      bio: bio,
    }

    set(dbRef, newDetails)
      .then(() => {
        Alert.alert('Success', 'Your details have been updated!')
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to update details, please try again.')
      })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholder="First Name"
          placeholderTextColor="darkgray"
          style={styles.input}
        />
        <View style={styles.separator} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor="darkgray"
          inputMode="email"
          style={styles.input}
        />
        <View style={styles.separator} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          value={bio}
          onChangeText={(text) => setBio(text)}
          placeholder="Bio"
          placeholderTextColor="darkgray"
          multiline={true}
          style={styles.textArea}
        />
        <View style={styles.separator} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save Profile" onPress={handleSubmit} color="black" />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 10,
  },
  textArea: {
    height: 100,
    borderWidth: 0,
    borderColor: '#ccc',
    paddingLeft: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  separator: {
    height: 0,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  buttonContainer: {
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
})
