import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const logo = require('@/assets/images/SADCAT.png')

const ProfileWardrobe = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.wardrobe}>Wardrobe</Text>
      <TouchableOpacity
        onPress={() => router.push('/wardrobe')}
        style={styles.addButton} // Corrected style prop
      >
        <Text style={styles.addButtonText}>Add to Wardrobe</Text>
      </TouchableOpacity>
      <Text style={styles.text}>HEADWEAR</Text>
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>ACCESSORIES</Text>
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>OUTERWEAR</Text>
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>TOPS</Text>
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>BOTTOMS</Text>
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
      <Text style={styles.text}>FOOTWEAR</Text>
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
        <Image source={logo} style={styles.img} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around', // Ensure items are spread out
    width: '100%', // Ensure it takes up full width
  },
  text: {
    textAlign: 'center',
    paddingTop: 10, // Reduced from 20 to decrease space between sections
    fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
  },
  wardrobe: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20, // Removed 'px' for compatibility with React Native
    marginBottom: 5, // Reduced from 10 to decrease space below wardrobe text
  },
  addButton: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 5, // Reduced from 10 to decrease vertical margin
    paddingVertical: 5,
    paddingHorizontal: 21, // Increased horizontal padding for longer button
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default ProfileWardrobe
