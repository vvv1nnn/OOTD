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

export default function EditProfile({ userId }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const dbRef = ref(firebase.database, `users/${userId}/profile`)
        const snapshot = await get(dbRef)
        if (snapshot.exists()) {
          const data = snapshot.val()
          setFirstName(data.firstName || '')
          setEmail(data.email || '')
          setBio(data.bio || '')
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile.')
      }
    }

    fetchUserProfile()
  }, [userId])

  const handleSubmit = async () => {
    try {
      const dbRef = ref(firebase.database, `users/${userId}/profile`)
      const newDetails = { firstName, email, bio }

      await set(dbRef, newDetails)
      Alert.alert('Success', 'Your details have been updated!')
    } catch (error) {
      Alert.alert('Error', 'Failed to update details, please try again.')
    }
  }

  return (
    <ScrollView style={styles.container}>
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
              onChangeText={setFirstName}
              placeholder="First Name"
              placeholderTextColor="darkgray"
              style={styles.input}
              accessibilityLabel="First Name" // Accessibility label
            />
            <View style={styles.separator} />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="darkgray"
              keyboardType="email-address"
              style={styles.input}
              accessibilityLabel="Email" // Accessibility label
            />
            <View style={styles.separator} />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              placeholderTextColor="darkgray"
              multiline={true}
              style={styles.textArea}
              accessibilityLabel="Bio" // Accessibility label
            />
            <View style={styles.separator} />
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
    width: '100%',
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
    width: '100%',
    paddingHorizontal: 10,
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
    height: 1,
    width: '100%',
    alignSelf: 'center',
    marginHorizontal: -15,
  },
  addButton: {
    width: '100%',
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