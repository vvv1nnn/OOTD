import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import Headwear from '@/components/Carousel/Headwear'
import Tops from '@/components/Carousel/Tops'
import Outerwear from '@/components/Carousel/Outerwear'
import Bottoms from '@/components/Carousel/Bottoms'
import Footwear from '@/components/Carousel/Footwear'
import Accessories from '@/components/Carousel/Accessories'
import ShuffleButton from '@/components/ShuffleButton'
import SaveButton from '@/components/SaveButton'

const logo = require('@/assets/images/ootd.png')

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.imageContainer2}>
          <Text style={styles.text}>OOTD.</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Shuffle</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const buttonSize = 200 // Adjust this value for desired button size

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'TYPOGRAPH-PRO-Semi-Bold',
    fontSize: 50,
    paddingTop: 20,
  },
  imageContainer2: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    width: buttonSize,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  addButton: {
    width: '100%',
    height: 40, // Adjust this value for desired button height
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
})
