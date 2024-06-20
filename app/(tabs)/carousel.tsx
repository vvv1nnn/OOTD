import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import Headwear from '@/components/Carousel/Headwear.tsx'
import Tops from '@/components/Carousel/Tops.tsx'
import Outerwear from '@/components/Carousel/Outerwear.tsx'
import Bottoms from '@/components/Carousel/Bottoms.tsx'
import Footwear from '@/components/Carousel/Footwear.tsx'
import Accessories from '@/components/Carousel/Accessories.tsx'
import ShuffleButton from '@/components/ShuffleButton.tsx'
import SaveButton from '@/components/SaveButton.tsx'

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
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: '25%',
    alignSelf: 'center', // Center the button
    backgroundColor: 'black',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
