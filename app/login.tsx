import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useRouter } from 'expo-router' // Import useRouter from expo-router

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    // Implement your login logic here (e.g., send data to server, validate inputs)
    console.log('Logging in with:', { email, password })
    // Reset fields after login (this is just for demonstration)
    setEmail('')
    setPassword('')
    // Navigate to Feed page
    router.push('/feed')
  }

  const navigateToSignUp = () => {
    router.push('/signup') // Navigate to SignUp page
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text}>OOTD.</Text>
        <View style={styles.formContainer}>
          <Text style={styles.title}>LOGIN</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={handleLogin} // Call handleLogin on button press
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToSignUp} // Call navigateToSignUp on button press
          >
            <Text style={styles.login}>Haven't signed up? Press to Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontFamily: 'TYPOGRAPH-PRO-Semi-Bold',
    fontSize: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
  },
  login: {
    textDecorationLine: 'underline',
    margin: 10,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '70%',
    height: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  login: {
    textDecorationLine: 'underline',
    margin: 10,
  },
})

export default LoginPage
