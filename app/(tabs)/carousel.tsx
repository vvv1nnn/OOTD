// App.js

import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Headwear from '@/components/Carousel/Headwear'
import Tops from '@/components/Carousel/Tops'
import Outerwear from '@/components/Carousel/Outerwear'
import Bottoms from '@/components/Carousel/Bottoms'
import Footwear from '@/components/Carousel/Footwear'
import Accessories from '@/components/Carousel/Accessories'

const App = () => {
  // Image arrays for each category
  const headwearImages = [
    'https://media.tenor.com/images/3704f2b9b8b66a5747116f436a5e6aba/tenor.gif',
    'https://i.redd.it/6d162ye9pwkb1.jpg',
    'https://media.tenor.com/images/425213c8ada06900931c2d0213389ae4/tenor.gif',
  ]

  const topsImages = [
    'https://media.tenor.com/images/3704f2b9b8b66a5747116f436a5e6aba/tenor.gif',
    'https://i.redd.it/6d162ye9pwkb1.jpg',
    'https://media.tenor.com/images/425213c8ada06900931c2d0213389ae4/tenor.gif',
  ]

  const outerwearImages = [
    'https://media.tenor.com/images/3704f2b9b8b66a5747116f436a5e6aba/tenor.gif',
    'https://i.redd.it/6d162ye9pwkb1.jpg',
    'https://media.tenor.com/images/425213c8ada06900931c2d0213389ae4/tenor.gif',
  ]

  const bottomsImages = [
    'https://media.tenor.com/images/3704f2b9b8b66a5747116f436a5e6aba/tenor.gif',
    'https://i.redd.it/6d162ye9pwkb1.jpg',
    'https://media.tenor.com/images/425213c8ada06900931c2d0213389ae4/tenor.gif',
  ]

  const footwearImages = [
    'https://media.tenor.com/images/3704f2b9b8b66a5747116f436a5e6aba/tenor.gif',
    'https://i.redd.it/6d162ye9pwkb1.jpg',
    'https://media.tenor.com/images/425213c8ada06900931c2d0213389ae4/tenor.gif',
  ]

  const accessoriesImages = [
    'https://media.tenor.com/images/3704f2b9b8b66a5747116f436a5e6aba/tenor.gif',
    'https://i.redd.it/6d162ye9pwkb1.jpg',
    'https://media.tenor.com/images/425213c8ada06900931c2d0213389ae4/tenor.gif',
  ]

  // State for currently displayed image in each category
  const [currentHeadwear, setCurrentHeadwear] = useState(headwearImages[0])
  const [currentTops, setCurrentTops] = useState(topsImages[0])
  const [currentOuterwear, setCurrentOuterwear] = useState(outerwearImages[0])
  const [currentBottoms, setCurrentBottoms] = useState(bottomsImages[0])
  const [currentFootwear, setCurrentFootwear] = useState(footwearImages[0])
  const [currentAccessories, setCurrentAccessories] = useState(
    accessoriesImages[0]
  )

  // Shuffle function to select a random image
  const getRandomImage = (images) => {
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
  }

  // Shuffle handler
  const handleShuffle = () => {
    setCurrentHeadwear(getRandomImage(headwearImages))
    setCurrentTops(getRandomImage(topsImages))
    setCurrentOuterwear(getRandomImage(outerwearImages))
    setCurrentBottoms(getRandomImage(bottomsImages))
    setCurrentFootwear(getRandomImage(footwearImages))
    setCurrentAccessories(getRandomImage(accessoriesImages)) // Ensure this is working
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Text style={styles.text}>OOTD.</Text>
        </View>

        {/* First row of components */}
        <View style={styles.row}>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Headwear</Text>
            <Headwear image={currentHeadwear} />
          </View>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Accessories</Text>
            <Accessories image={currentAccessories} />
          </View>
        </View>

        {/* Second row of components */}
        <View style={styles.row}>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Outerwear</Text>
            <Outerwear image={currentOuterwear} />
          </View>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Tops</Text>
            <Tops image={currentTops} />
          </View>
        </View>

        {/* Third row of components */}
        <View style={styles.row}>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Bottoms</Text>
            <Bottoms image={currentBottoms} />
          </View>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Footwear</Text>
            <Footwear image={currentFootwear} />
          </View>
        </View>

        {/* Buttons row */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleShuffle}>
            <Text style={styles.buttonText}>Shuffle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  text: {
    fontFamily: 'TYPOGRAPH-PRO-Semi-Bold',
    fontSize: 50,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  component: {
    flex: 1,
    minWidth: '40%', // Adjust as needed based on your design
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Ensure text is centered horizontally
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default App
