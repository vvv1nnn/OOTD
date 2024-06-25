import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
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
  const [bio, setBio] = useState('')
  const [bioHeight, setBioHeight] = useState(50) // Initial height for the bio input

  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const dbRef = ref(firebase.database, `users/${userId}/profile`)
        const snapshot = await get(dbRef)
        if (snapshot.exists()) {
          const data = snapshot.val()
          setFirstName(data.firstName || '')
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
      const newDetails = { firstName, bio }

      await set(dbRef, newDetails)
      Alert.alert('Success', 'Your details have been updated!')
    } catch (error) {
      Alert.alert('Error', 'Failed to update details, please try again.')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter your first name"
                    placeholderTextColor="#999"
                    style={styles.input}
                    accessibilityLabel="First Name"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Bio</Text>
                  <TextInput
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Tell us about yourself"
                    placeholderTextColor="#999"
                    multiline={true}
                    style={[styles.input, { height: bioHeight }]} // Use dynamic height
                    accessibilityLabel="Bio"
                    onContentSizeChange={(event) =>
                      setBioHeight(
                        event.nativeEvent.contentSize.height > 50
                          ? event.nativeEvent.contentSize.height
                          : 50
                      )
                    }
                  />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.backButton]}
                  onPress={() => router.push('/profile')}
                >
                  <Text style={styles.buttonText}>Back to Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Ensure there's a background color to cover the entire screen
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    width: '100%',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, // Adjust max width based on your design preference
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%', // Ensure input containers stretch to full width
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    paddingBottom: 10,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#333',
    width: '100%', // Ensure inputs stretch to full width
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 8,
    width: '100%', // Ensure text areas stretch to full width
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 6,
    marginTop: 0,
    alignItems: 'center',
    width: '100%', // Ensure buttons stretch to full width
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#aaa',
    marginTop: 10,
  },
})
