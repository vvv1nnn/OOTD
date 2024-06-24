import { StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AddClothingItem from '@/components/Wardrobe/AddItems'

export default function Wardrobe() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.wardrobe}> WARDROBE </Text>
        <AddClothingItem userId={'vin'} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  wardrobe: {
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
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
