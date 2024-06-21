import { StyleSheet, View, Pressable, Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { PropsWithChildren } from 'react'
import { Link } from 'expo-router'

type Props = {
  label: string
  theme: string
}

export default function CustomButton({ label, theme }: Props) {
  if (theme === 'login') {
    return (
      <Link href="/login">
        <View style={[styles.buttonContainer]}>
          <View style={[styles.button]}>
            <Text style={[styles.buttonLabel]}>{label}</Text>
          </View>
        </View>
      </Link>
    )
  } else {
    return (
      <Link href="/signup">
        <View style={[styles.buttonContainer]}>
          <View style={[styles.button]}>
            <Text style={[styles.buttonLabel]}>{label}</Text>
          </View>
        </View>
      </Link>
    )
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert('You pressed a button.')}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderColor: '#474747',
    borderRadius: 10,
  },
  button: {
    borderRadius: 8, // Adjusted to match the LoginPage button
    backgroundColor: 'black', // Adjusted to match the LoginPage button
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonIcon: {
    paddingLeft: 6,
  },
  buttonLabel: {
    fontSize: 16, // Adjusted to match the LoginPage button text size
    color: 'white', // Adjusted to match the LoginPage button text color
    fontWeight: 'bold', // Adjusted to match the LoginPage button text weight
  },
})
