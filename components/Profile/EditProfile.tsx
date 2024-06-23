import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useRouter } from 'expo-router'
import firebase from '../../firebaseConfig'
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

  const router = useRouter()

  useEffect(() => {
    const dbRef = ref(firebase.database, `users/${userId}/profile`)
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
    const dbRef = ref(firebase.database, `users/${userId}/profile`)

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
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('@/assets/images/SADCAT.png')}
                style={styles.image}
              />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                placeholder="First Name"
                placeholderTextColor="darkgray"
                style={styles.input}
              />
              <View style={[styles.separator, styles.blackSeparator]} />
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
              <View style={[styles.separator, styles.blackSeparator]} />
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
              <View style={[styles.separator]} />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>Save Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addButton, styles.backButton]}
              onPress={() => router.push('/profile')}
            >
              <Text style={styles.addButtonText}>Back to Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    width: '100%', // Ensure the container takes the full width
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  sectionContainer: {
    marginBottom: 10,
    width: '100%', // Ensure the container takes the full width
    paddingHorizontal: 10, // Add horizontal padding to adjust separator width
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  separator: {
    height: 1, // Increase height for better visibility
    width: '150%', // Increase width to extend beyond the sectionContainer
    alignSelf: 'center', // Center align the separator
    marginHorizontal: -15, // Adjust margins to cover the padding of sectionContainer
  },

  addButton: {
    width: '100%', // Ensure the button takes the full width
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'black',
  },
})
