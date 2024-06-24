import { StyleSheet, View, Pressable, Text, Platform } from 'react-native'
import { Link } from 'expo-router'

type Props = {
  label: string
  theme: string
}

export default function CustomButton({ label, theme }: Props) {
  if (theme === 'login') {
    return (
      <Link href="/login">
        <View style={[styles.buttonContainer, styles.shadow]}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>{label}</Text>
          </View>
        </View>
      </Link>
    )
  } else {
    return (
      <Link href="/signup">
        <View style={[styles.buttonContainer, styles.shadow]}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>{label}</Text>
          </View>
        </View>
      </Link>
    )
  }

  return (
    <View style={[styles.buttonContainer, styles.shadow]}>
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
    width: 200,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderColor: '#474747',
    borderRadius: 10,
  },
  button: {
    borderRadius: 3,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 100,
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
})
