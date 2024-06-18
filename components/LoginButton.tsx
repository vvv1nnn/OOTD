import { StyleSheet, View, Pressable, Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { PropsWithChildren } from 'react'
import { Link } from 'expo-router'

type Props = {
  label: string
  theme: string
}

export default function Button({ label, theme }: Props) {
  if (theme === 'primary') {
    return (
      <Link href="/feed">
        <View
          style={[
            styles.buttonContainer,
            { borderWidth: 4, borderColor: '#474747', borderRadius: 18 },
          ]}
        >
          <View style={[styles.button, { backgroundColor: '#fff' }]}>
            <Text style={[styles.buttonLabel, { color: '#25292e' }]}>
              {label}
            </Text>
            <FontAwesome
              name="arrow-circle-right"
              size={18}
              color="#25292e"
              style={styles.buttonIcon}
            />
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
    width: 240,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingLeft: 8,
  },
  buttonLabel: {
    color: 'black',
    fontSize: 20,
  },
})
