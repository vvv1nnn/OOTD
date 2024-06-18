import { StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text> FEED TEST </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    marginTop: 10,
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
})