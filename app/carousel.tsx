import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Headwear from '../components/Carousel/Headwear.tsx' // Import your component
import Tops from '../components/Carousel/Tops.tsx'
import Outerwear from '../components/Carousel/Outerwear.tsx'
import Bottoms from '../components/Carousel/Bottoms.tsx'
import Footwear from '../components/Carousel/Footwear.tsx'
import Accessories from '../components/Carousel/Accessories.tsx'
import ShuffleButton from '../components/ShuffleButton.tsx'
import SaveButton from '../components/SaveButton.tsx'

// import Header from '../components/Header.tsx'

const logo = require('../assets/images/ootd.png')

export default function App() {
  return (
    <SafeAreaView>
      {/* <Header /> */}
      <ScrollView>
        <View style={styles.imageContainer2}>
          <Image source={logo} style={styles.image2}></Image>
        </View>
        <View style={styles.container}>
          <Text style={styles.sectionHeader}>Headwear</Text>
          <Headwear />
          <Text style={styles.sectionHeader}>Accessories</Text>
          <Accessories />
          <Text style={styles.sectionHeader}>Outerwear</Text>
          <Outerwear />
          <Text style={styles.sectionHeader}>Tops</Text>
          <Tops />
          <Text style={styles.sectionHeader}>Bottoms</Text>
          <Bottoms />
          <Text style={styles.sectionHeader}>Footwear</Text>
          <Footwear />
        </View>
        <ShuffleButton style={styles.buttonContainer} />
        <SaveButton style={styles.buttonContainer} />
      </ScrollView>
    </SafeAreaView>
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  container2: {
    flex: 1,
  },
  imageContainer2: {
    alignItems: 'center',
  },
  image2: {
    height: 100,
  },

  buttonContainer: {
    width: 240,
    height: 68,
    marginHorizontal: 130,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginTop: 10,
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
