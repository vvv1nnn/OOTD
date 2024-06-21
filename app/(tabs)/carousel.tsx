import React from 'react'
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
            <Headwear />
          </View>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Accessories</Text>
            <Accessories />
          </View>
        </View>

        {/* Second row of components */}
        <View style={styles.row}>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Outerwear</Text>
            <Outerwear />
          </View>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Tops</Text>
            <Tops />
          </View>
        </View>

        {/* Third row of components */}
        <View style={styles.row}>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Bottoms</Text>
            <Bottoms />
          </View>
          <View style={styles.component}>
            <Text style={styles.sectionHeader}>Footwear</Text>
            <Footwear />
          </View>
        </View>

        {/* Buttons row */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
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
